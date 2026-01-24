using Backend.Services;
using Scalar.AspNetCore; // Add this

var builder = WebApplication.CreateBuilder(args);

// 1. Add Services
builder.Services.AddControllers();
builder.Services.AddSingleton<AIService>();
builder.Services.AddHttpClient<AIService>(); // Gives the service a "phone"
builder.Services.AddScoped<AIService>();      // Hires the service

// 2. Enable Native OpenAPI
builder.Services.AddOpenApi();

// 3. CORS
builder.Services.AddCors(options => {
    options.AddPolicy("AllowReact", p => p.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

// 4. Configure Pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi(); // Generates the JSON
    app.MapScalarApiReference(); // Replaces Swagger UI (accessible at /scalar/v1)
}

app.UseCors("AllowReact");
app.UseAuthorization();
app.MapControllers();

app.Run();