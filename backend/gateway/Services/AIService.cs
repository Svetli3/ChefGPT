namespace Backend.Services
{
    public class AIService
    {
        public async Task<string> GetRecipeAsync(string userInput)
        {
            // Simulate AI response (replace with actual AI API call if needed)
            await Task.Delay(500); // simulate async work
            return $"You typed: {userInput}";
        }
    }
}
