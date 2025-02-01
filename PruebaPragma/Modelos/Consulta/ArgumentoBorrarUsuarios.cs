using System.ComponentModel.DataAnnotations;

namespace PruebaPragma.Modelos.Consulta
{
    public class ArgumentosBorrarUsuario
    {
        [Required(ErrorMessage = "El id es requerido")]
        [Range(minimum: 1, maximum: int.MaxValue, ErrorMessage = "El id del usuario debe ser mayor que 0")]
        public int UsuarioId { get; set; }
    }
}
