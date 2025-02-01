using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace PruebaPragma.Repositorios.EF.Usuarios
{


    public class DataBaseDBContext : DbContext
    {
        private string _cadenaConexion;



        public DbSet<UsuariosEF> Usuarios { get; set; } = null!;
        private DataBaseDBContext()
        {
            _cadenaConexion = String.Empty;
        }

        public DataBaseDBContext(string cadenaConexion)
        {
            _cadenaConexion = cadenaConexion;
        }
        public DataBaseDBContext(DbContextOptions opciones) : base(opciones)
        {
            _cadenaConexion = Database.GetDbConnection().ConnectionString ?? String.Empty;

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //En caso de que el contexto no este configurado, lo configuramos mediante la cadena de conexion
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(_cadenaConexion);
            }
        }
    }

    
}