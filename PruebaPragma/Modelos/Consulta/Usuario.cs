namespace PruebaPragma.Modelos.Consulta
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Rut { get; set; }
        public string? Correo { get; set; }
        public DateTime FechaNacimiento { get; set; }
    }
}
