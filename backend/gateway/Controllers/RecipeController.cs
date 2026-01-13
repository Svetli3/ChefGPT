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

        public RecipeController(AIService aiService)
        {
            _aiService = aiService;
        }

        [HttpPost]
        public async Task<IActionResult> PostRecipe([FromBody] RecipeRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.UserInput))
                return BadRequest("Input cannot be empty.");

            var aiResponse = await _aiService.GetRecipeAsync(request.UserInput);
            return Ok(new { Response = aiResponse });
        }

        // Optional: simple GET route to check backend is running
        [HttpGet("/")]
        public IActionResult GetRoot()
        {
            return Ok("Backend is running!");
        }
    }
}
