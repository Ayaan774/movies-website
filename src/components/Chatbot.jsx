import { useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          contents: [{ parts: [{ text: input }] }],
        }
      );
      console.log(response.data);
      const botReply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";

      const botMessage = { text: botReply, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error with Gemini API:", error);
      setMessages((prev) => [...prev, { text: "Oops! Something went wrong.", sender: "bot" }]);
    }
  };

  return (
    <div>
      <button
        onClick={toggleChat}
        className="fixed bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg"
      >
        💬 Chat
      </button>
      {isOpen && (
        <div className="fixed bottom-16 right-5 w-80 bg-white p-4 rounded-lg shadow-xl text-black">
          <div className="h-120 overflow-y-auto border-b pb-2">
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender === "user" ? "text-right" : "text-left"}>
                <p className={`p-2 my-1 inline-block rounded-lg ${msg.sender === "user" ? "bg-blue-400 text-white" : "bg-gray-200"}`}>
                  {msg.text}
                </p>
              </div>
            ))}
          </div>
          <div className="flex mt-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about movies..."
              className="flex-1 border rounded p-2"
            />
            <button onClick={sendMessage} className="bg-blue-500 text-white p-2 ml-2 rounded">
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
