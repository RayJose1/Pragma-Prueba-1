using System.ComponentModel.DataAnnotations;

namespace PruebaPragma.Modelos.Consulta
{
    public class ArgumentosModificarUsuario
    {
        [Required(ErrorMessage = "El id es requerido")]
        [Range(minimum: 1, maximum: int.MaxValue, ErrorMessage = "El id del usuario debe ser mayor que 0")]
        public int IdUsuario { get; set; }
        [Required(ErrorMessage = "El nombre es requerido")]
        public required string Nombre { get; set; }
        [EmailAddress(ErrorMessage = "El formato del email es incorrecto, por favor ingreselo nuevamente.")]
        public string? Correo { get; set; } = null;
        [Required(ErrorMessage = "La fecha de nacimiento es requerida")]
        public DateTime FechaNacimiento { get; set; }
    }
}
