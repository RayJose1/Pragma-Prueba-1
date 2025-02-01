using Microsoft.EntityFrameworkCore;
using PruebaPragma.Integracion;
using PruebaPragma.Repositorios;
using PruebaPragma.Repositorios.EF.Usuarios;
using PruebaPragma.Servicio;
using System.Globalization;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddScoped<IServicioUsuario, ServicioUsuario>(); 
        builder.Services.AddScoped<IRepositorioUsuario, RepositorioUsuario>(); 

        builder.Services.AddCors();
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

       
        builder.Services.AddDbContext<DataBaseDBContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("CadenaConexion"))); 

        var app = builder.Build();

        var cultureInfo = new CultureInfo("es-CL");
        app.UseRequestLocalization(new RequestLocalizationOptions
        {
            DefaultRequestCulture = new Microsoft.AspNetCore.Localization.RequestCulture(cultureInfo),
            SupportedCultures = new List<CultureInfo>
                {
                    cultureInfo,
                },
            SupportedUICultures = new List<CultureInfo>
                {
                    cultureInfo,
                }
        });

        // Configuración de CORS
        app.UseCors(option =>
        {
            option.WithOrigins("http://localhost:5173");
            option.AllowAnyMethod();
            option.AllowAnyHeader();
        });

        // Configuración del pipeline HTTP
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();
        app.UseAuthorization();
        app.MapControllers();
        app.Run();
    }
}
