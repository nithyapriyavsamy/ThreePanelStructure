using ThreePanelStructure.Interfaces;
using ThreePanelStructure.Middlewares;
using ThreePanelStructure.Repositories;
using ThreePanelStructure.Services;


namespace ThreePanelStructure
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddScoped<IPanelStructureRepo, PanelStructureRepo>();
            builder.Services.AddScoped<IPanelStructureService, PanelStructureService>();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("ReactCORS",
                    builder => builder.AllowAnyOrigin()
                                      .AllowAnyHeader()
                                      .AllowAnyMethod());
            });


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseMiddleware<ExceptionHandler>();

            app.UseHttpsRedirection();

            app.UseCors("ReactCORS");
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}