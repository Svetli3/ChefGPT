using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Services
{
    public class RecipesService
    {
        private readonly AppDbContext _context;

        public RecipesService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Recipe> CreateRecipeAsync(Recipe recipe)
        {
            _context.Recipes.Add(recipe);
            await _context.SaveChangesAsync();
            return recipe;
        }

        public async Task<List<Recipe>> GetRecipesAsync(int userId)
        {
            return await _context.Recipes
            .Where(r => r.UserId == userId)
            .ToListAsync();
        }
    }
}