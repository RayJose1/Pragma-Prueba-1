using System.ComponentModel.DataAnnotations;

namespace PruebaPragma.Repositorios.EF.Usuarios
{
    public class UsuariosEF
    {
        [Key]
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public required string Rut { get; set; }
        public string? Correo { get; set; }
        public DateTime FechaNacimiento { get; set; }
    }
}
