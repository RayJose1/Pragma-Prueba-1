using CsvHelper;
using Newtonsoft.Json;
using PruebaPragma.Integracion;
using PruebaPragma.Modelos.Consulta;
using PruebaPragma.Repositorios;
using System.Dynamic;
using System.Formats.Asn1;
using System.Text;

namespace PruebaPragma.Servicio
{
    public class ServicioUsuario : IServicioUsuario
    {
        private readonly IConfiguration _configuracion;
        private IRepositorioUsuario _repositorioUsuario;

        public ServicioUsuario(IConfiguration configuracion, IRepositorioUsuario repositorioUsuario)
        {
            _configuracion = configuracion;
            _repositorioUsuario = repositorioUsuario;
        }
        public async Task<bool> CrearUsuario(ArgumentosCrearUsuario argumentos)
        {
            bool resultado = false;
            var validarUsuario = await _repositorioUsuario.ObtenerUsuarioPorRut(argumentos.Rut);
            if (validarUsuario)
                throw new ArgumentException("El usuario ya existe");

            resultado = await _repositorioUsuario.CrearUsuario(argumentos);
            if (!resultado)
                throw new ArgumentException("No se pudo crear el usuario, ocurrió un error");

            return resultado;
        }

        public async Task<bool> ModificarUsuario(ArgumentosModificarUsuario argumentos)
        {
            bool resultado = false;

            resultado = await _repositorioUsuario.ModificarUsuario(argumentos);
            if (!resultado)
                throw new ArgumentException("No se pudo modificar el usuario, ocurrió un error");

            return resultado;
        }

        public async Task<bool> BorrarUsuario(ArgumentosBorrarUsuario argumentos)
        {
            bool resultado = false;

            resultado = await _repositorioUsuario.BorrarUsuario(argumentos);
            if (!resultado)
                throw new ArgumentException("No se pudo borrar el usuario, ocurrió un error");

            return resultado;
        }

        public async Task<List<Usuario>> ObtenerListaUsuarios()
        {

            List<Usuario> resultado = await _repositorioUsuario.ObtenerListaUsuarios();
            if (resultado.Count == 0 || resultado == null)
                throw new ArgumentException("No se encontraron resultados.");

            return resultado;
        }
        public async Task<string> ObtenerListaUsuariosExcel()
        {

            List<Usuario> resultado = await _repositorioUsuario.ObtenerListaUsuarios();
            if (resultado.Count == 0 || resultado == null)
                throw new ArgumentException("No se encontraron resultados.");

            string jsonString = System.Text.Json.JsonSerializer.Serialize(resultado);

            return ConversionToCSV(jsonString);
        }

        private static string ConversionToCSV(string jsonContent)
        {

            var conversion = JsonConvert.DeserializeObject<ExpandoObject[]>(jsonContent);
            StringBuilder st = new StringBuilder();
            using (TextWriter writer = new StringWriter(st))
            {
                using (var csv = new CsvWriter(writer, System.Globalization.CultureInfo.CurrentCulture))
                {
                    csv.WriteRecords((conversion as IEnumerable<dynamic>));
                }

                byte[] bytes = Encoding.Unicode.GetBytes(st.ToString());
                return Convert.ToBase64String(bytes);

            }

        }
    }
}