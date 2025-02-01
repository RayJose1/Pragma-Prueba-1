using PruebaPragma.Modelos.Consulta;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using PruebaPragma.Repositorios.EF.Usuarios;
using System.Threading.Tasks;
using PruebaPragma.Integracion;
using AutoMapper;

namespace PruebaPragma.Repositorios
{
    public class RepositorioUsuario : IRepositorioUsuario
    {
        private readonly string _cadenaConexion;
        private DataBaseDBContext _dataBaseDBContext;
        private readonly IConfiguration _configuration;
        private Mapper _mapper;


        public RepositorioUsuario(IConfiguration configuration)
        {
            _configuration = configuration;
            _cadenaConexion = _configuration.GetConnectionString("CadenaConexion");

            var opcionesDBContext = new DbContextOptionsBuilder<DbContext>();
            opcionesDBContext.UseSqlServer(_cadenaConexion);

            _dataBaseDBContext = new DataBaseDBContext(opcionesDBContext.Options);
            MapperConfiguration config = new MapperConfiguration(cfg => cfg.CreateMap<UsuariosEF, Usuario>()
                                                                         .ReverseMap());

            _mapper = new Mapper(config);

        }

        public async Task<bool> CrearUsuario(ArgumentosCrearUsuario argumentos)
        {
            bool resultado = false;

            UsuariosEF usuarioBD = new UsuariosEF
            {
                Nombre = argumentos.Nombre,
                Correo = argumentos.Correo,
                FechaNacimiento = argumentos.FechaNacimiento,
                Rut = argumentos.Rut
            };
            _dataBaseDBContext.Usuarios.Add(usuarioBD);
            resultado = await _dataBaseDBContext.SaveChangesAsync() > 0;

            return resultado;
        }

        public async Task<bool> ModificarUsuario(ArgumentosModificarUsuario argumentos)
        {


            bool resultado = false;

            UsuariosEF? usuarioBD = await _dataBaseDBContext.Usuarios.FirstOrDefaultAsync(m => m.Id == argumentos.IdUsuario);
            if (usuarioBD != null)
            {
                usuarioBD.Nombre = argumentos.Nombre;
                usuarioBD.Correo = argumentos.Correo;
                usuarioBD.FechaNacimiento = argumentos.FechaNacimiento;

                _dataBaseDBContext.Usuarios.Update(usuarioBD);
                resultado = await _dataBaseDBContext.SaveChangesAsync() > 0;
            }


            return resultado;

        }

        public async Task<bool> BorrarUsuario(ArgumentosBorrarUsuario argumentos)
        {


            bool resultado = false;

            UsuariosEF? usuarioBD = await _dataBaseDBContext.Usuarios.FirstOrDefaultAsync(m => m.Id == argumentos.UsuarioId);
            if (usuarioBD != null)
            {
                _ = _dataBaseDBContext.Usuarios.Remove(usuarioBD);
                resultado = await _dataBaseDBContext.SaveChangesAsync() > 0;
            }

            return resultado;


        }

        public async Task<List<Usuario>> ObtenerListaUsuarios()
        {
            List<Usuario> resultado;

            List<UsuariosEF>? usuarioBD = await _dataBaseDBContext.Usuarios.ToListAsync();

            resultado = _mapper.Map<List<Usuario>>(usuarioBD);

            return resultado;
        }

        public async Task<bool> ObtenerUsuarioPorRut(string rut)
        {
            bool resultado = false;

            UsuariosEF? usuarioBD = await _dataBaseDBContext.Usuarios.FirstOrDefaultAsync(m => m.Rut == rut);
            if (usuarioBD != null)
                resultado = true;

            return resultado;
        }



    }
}
