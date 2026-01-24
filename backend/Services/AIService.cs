using System.Net.Http.Json;

namespace Backend.Services
{
    public class AIService
    {
        private readonly HttpClient _http;

        public AIService(HttpClient http)
        {
            _http = http;
        }

        public async Task<string> GetRecipeAsync(string userInput)
        {

            var requestBody = new
            {
                model = "gemma3:4b", 
                system = "You are an AI for a recipe website please give the recipe they ask for along with calories and cooking time please give as simple instructions as possible, any non recipe related questions should be ignored and ask the user to give you a recipe related question, alos just give the recipe dont use more words then you need too put the title at the very top of your reply",
                prompt = $"Give me a simple recipe for: {userInput}",
                stream = false,
                options = new { temperature = 0.3 } // how much chefgpt follows the rules
            };


            var response = await _http.PostAsJsonAsync("http://localhost:11434/api/generate", requestBody);


            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadFromJsonAsync<OllamaResult>();
                return result?.response ?? "No response from AI.";
            }

            return "Error: Could not talk to Ollama. Make sure the app is open!";
        }
    }

    // This helps .NET read the specific way Ollama talks
    public class OllamaResult { public string response { get; set; } }
}