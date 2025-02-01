using System.ComponentModel.DataAnnotations;

namespace PruebaPragma.Modelos.Consulta
{
    public class ArgumentosCrearUsuario
    {
        [Required(ErrorMessage = "El nombre es requerido")]
        public required string Nombre { get; set; }
        [Required(ErrorMessage = "El rut es requerido")]
        public required string Rut { get; set; }
        [EmailAddress(ErrorMessage = "El formato del email es incorrecto, por favor ingreselo nuevamente.")]
        public string? Correo { get; set; } = null;
        [Required(ErrorMessage = "La fecha de nacimiento es requerida")]
        public DateTime FechaNacimiento { get; set; }
    }
}
