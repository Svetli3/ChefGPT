using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Backend.Data;
using Backend.Services;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Scalar.AspNetCore;

Env.Load();

var builder = WebApplication.CreateBuilder(args);

var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL");

// Add services
builder.Services.AddDbContext<AppDbContext>(options =>
     options.UseNpgsql(connectionString));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = Environment.GetEnvironmentVariable("JWT_AUTHORITY");
        options.Audience = Environment.GetEnvironmentVariable("JWT_AUDIENCE");
        options.RequireHttpsMetadata = false; // ONLY TO BE USED FOR DEV ENVIRONMENT, otherwise needs to be true
    });

builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<RecipesService>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<AIService>();
builder.Services.AddHttpClient<AIService>(); // Gives the service a "phone"
builder.Services.AddScoped<AIService>();  

builder.Services.AddOpenApi();


// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactDev", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // React dev server
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowReactDev");

// Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.MapControllers();

app.Run();
