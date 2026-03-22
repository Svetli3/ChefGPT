using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecipeController : ControllerBase
    {
        private readonly AIService _aiService;
        private readonly RecipesService _recipesService;

        public RecipeController(AIService aiService, RecipesService recipesService)
        {
            _aiService = aiService;
            _recipesService = recipesService;
        }

        [HttpPost]
        public async Task<IActionResult> PostRecipe([FromBody] RecipeRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.UserInput))
                return BadRequest("Input cannot be empty.");

            var aiResponse = await _aiService.GetRecipeAsync(request.UserInput);
            return Ok(new { Response = aiResponse });
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetRecipes(int userId)
        {
            var recipes = await _recipesService.GetRecipesAsync(userId); 
            return Ok(new { recipes });    
        }

        // Optional: simple GET route to check backend is running
        [HttpGet("/")]
        public IActionResult GetRoot()
        {
            return Ok("Backend is running!");
        }
    }
}