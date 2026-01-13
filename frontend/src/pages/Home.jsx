import { useState } from "react";

function Home() {
  const [inputValue, setInputValue] = useState("");
  const [aiResponse, setAiResponse] = useState(""); // store API response
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") return;

    setLoading(true);

    try {
      const response = await fetch("/api/recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: inputValue }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error:", errorText);
        setAiResponse("Error: " + errorText);
      } else {
        const data = await response.json();
        setAiResponse(data.response || data.Response); 
      }
    } catch (err) {
      console.error(err);
      setAiResponse("Something went wrong.");
    }

    setInputValue(""); 
    setLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6">Hi username, How Can I Help?</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Type something and press Enter..."
        />
      </form>

      <div className="mt-4 w-full max-w-md">
        {loading && <p className="text-gray-500">Loading...</p>}
        {aiResponse && (
          <div className="border border-gray-300 rounded p-4 bg-gray-50">
            <strong>AI Response:</strong>
            <p>{aiResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
