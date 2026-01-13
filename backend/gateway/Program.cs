// using Backend.Services;
// using Microsoft.OpenApi.Models;

// var builder = WebApplication.CreateBuilder(args);

// // 1. Add CORS policy for React
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowReact",
//         policy => policy
//             .WithOrigins("http://localhost:3000") 
//             .AllowAnyMethod()
//             .AllowAnyHeader());
// });

// // 2. Add Services
// builder.Services.AddControllers();
// builder.Services.AddSingleton<AIService>(); // Ensure AIService is defined in Backend.Services

// // 3. Configure Swagger
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen(c =>
// {
//     c.SwaggerDoc("v1", new OpenApiInfo { Title = "ChefGPT API", Version = "v1" });
// });

// var app = builder.Build();

// // 4. Configure HTTP Pipeline
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI(c =>
//     {
//         c.SwaggerEndpoint("/swagger/v1/swagger.json", "ChefGPT API V1");
//     });
// }

// app.UseCors("AllowReact");
// app.UseAuthorization();
// app.MapControllers();

// app.Run();

using Backend.Services;
using Scalar.AspNetCore; // Add this

var builder = WebApplication.CreateBuilder(args);

// 1. Add Services
builder.Services.AddControllers();
builder.Services.AddSingleton<AIService>();

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