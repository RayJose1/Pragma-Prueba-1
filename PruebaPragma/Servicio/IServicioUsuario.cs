using PruebaPragma.Modelos.Consulta;
using PruebaPragma.Repositorios;
namespace PruebaPragma.Servicio
{
    public interface IServicioUsuario
    {
        Task<bool> CrearUsuario(ArgumentosCrearUsuario argumentos);
        Task<bool> ModificarUsuario(ArgumentosModificarUsuario argumentos);
        Task<bool> BorrarUsuario(ArgumentosBorrarUsuario argumentos);
        Task<List<Usuario>> ObtenerListaUsuarios();
        Task<string> ObtenerListaUsuariosExcel();

    }
}
