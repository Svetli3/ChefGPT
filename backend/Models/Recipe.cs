using Backend.Settings;

namespace Backend.Models
{
    public class Recipe
    {
        public required int Id { get; set; }
        public required int UserId { get; set; }
        public required string Title { get; set; }
        public required RecipeDifficulty Difficulty { get; set; }
        public int PreparationTime { get; set; }
        public int CookingTime { get; set; }
        public int NoOfIngredients { get; set; }
        public int RecipeCalories { get; set; }
        public string ImageUrl { get; set; } = null!;

        public required User User {get; set; }
    }
}
