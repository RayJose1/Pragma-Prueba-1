using PruebaPragma.Modelos.Consulta;

namespace PruebaPragma.Integracion
{
    public interface IRepositorioUsuario
    {
        public Task<bool> CrearUsuario(ArgumentosCrearUsuario argumentos);
        public Task<bool> ModificarUsuario(ArgumentosModificarUsuario argumentos);
        public Task<bool> BorrarUsuario(ArgumentosBorrarUsuario argumentos);
        public Task<List<Usuario>> ObtenerListaUsuarios();
        public Task<bool> ObtenerUsuarioPorRut(string rut);

    }
}
