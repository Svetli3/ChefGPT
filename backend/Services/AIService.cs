using System.Net.Http.Json;
using Backend.Settings;

namespace Backend.Services
{
    public class AIService
    {
        private readonly HttpClient _http;
        private readonly string _ollamaApiUrl;

        public AIService(HttpClient http)
        {
            _http = http;
            this._ollamaApiUrl = Environment.GetEnvironmentVariable("OLLAMA_API_URL") ?? "http://localhost:11434";
        }

        public async Task<string> GetRecipeAsync(string userInput)
        {

            var requestBody = new
            {
                model = Settings.AppSettings.AI_MODEL, 
                system = Settings.AppSettings.AI_SYSTEM,
                prompt = Settings.AppSettings.AI_PROMPT + userInput,
                stream = false,
                options = new { temperature = 0.3 } // how much chefgpt follows the rules
            };


            var response = await _http.PostAsJsonAsync($"{_ollamaApiUrl}/api/generate", requestBody);


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