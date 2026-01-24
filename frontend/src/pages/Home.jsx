import { useState, useEffect, useRef } from "react";
import { Plus, CornerUpLeft, Calculator } from "lucide-react";

function Home() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you today?", sender: "ai" }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null); 

  // This scrolls the chat to the bottom whenever a new message arrives
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    // 1. Add User message to the chain
    const userMsg = { text: inputValue, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    const currentInput = inputValue;
    setInputValue(""); 

    try {
      const response = await fetch("http://localhost:5000/api/recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: currentInput }),
      });

      const data = await response.json();
      
      // 2. Add AI message to the chain
      const aiMsg = { text: data.response || data.Response, sender: "ai" };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [...prev, { text: "Error: Could not reach the chef.", sender: "ai" }]);
    }
    setLoading(false);
  };

  // reply icons // 
  const addToCookbook = (text) => {
    console.log("Saving to database:", text);
    alert("Recipe added to your cookbook!");
  };

  const handleReply = (text) => {
  const firstLine = text.split('\n')[0].trim();
  setInputValue(`Regarding the "${firstLine}": `);
  document.querySelector('input')?.focus();
};

  const handleCalculate = async (recipeText) => {
    setLoading(true);
    const prompt = `Based on this recipe, calculate the approximate calories and macros: ${recipeText}`;
  }

  return (
  <div className="flex flex-col h-screen w-full bg-gray-100">
    

    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg, index) => (
      <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
        <div className="group relative max-w-[85%] p-4 rounded-2xl shadow-sm bg-white border border-gray-200">
          
          {/* 1. The Dynamic Icon Tray */}
          {msg.sender === "ai" && (
            <div className="absolute top-2 right-2 flex gap-1 bg-white/90 backdrop-blur-sm rounded-lg p-1 shadow-sm border border-gray-100">
              <button onClick={() => addToCookbook(msg.text)} className="p-1.5 hover:bg-green-50 rounded-md text-gray-500 hover:text-green-600 transition-colors" title="Add to Book">
                <Plus size={16} />
              </button>
              <button onClick={() => handleReply(msg.text)} className="p-1.5 hover:bg-blue-50 rounded-md text-gray-500 hover:text-blue-600 transition-colors" title="Reply">
                <CornerUpLeft size={16} />
              </button>
              <button onClick={() => handleCalculate(msg.text)} className="p-1.5 hover:bg-orange-50 rounded-md text-gray-500 hover:text-orange-600 transition-colors" title="Calculate Macros">
                <Calculator size={16} />
              </button>
            </div>
          )}

          <div className={msg.sender === "ai" ? "pr-24" : ""}>
            <p className="whitespace-pre-wrap">{msg.text}</p>
          </div>
        </div>
      </div>
    ))}
      <div ref={scrollRef} />
    </div>


    <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 w-full">
      <form onSubmit={handleSubmit} className="flex gap-4 w-full max-w-none">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 border border-gray-300 rounded-full px-6 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Type your recipe request..."
        />
        <button type="submit" className="bg-blue-600 text-white px-8 rounded-full font-semibold">
          Send
        </button>
      </form>
    </div>
  </div>
);
}

export default Home;
