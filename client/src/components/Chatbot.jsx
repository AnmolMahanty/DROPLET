import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      const userMessage = { sender: "user", text: input };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      // Simulating a bot response
      const botResponse = getBotResponse(input);
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 500);

      setInput("");
    }
  };

  const getBotResponse = (input) => {
    const responseText = `Thank you for your query: "${input}". I'll direct you to relevant resources shortly.`;
    return { sender: "bot", text: responseText };
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="relative">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      ) : (
        <div className="flex flex-col w-80 h-96 bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="flex items-center justify-between bg-blue-500 text-white py-3 px-4">
            <h3 className="font-bold">Droplet Chatbot</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-grow overflow-y-auto p-4 space-y-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${
                  message.sender === "user"
                    ? "self-end bg-blue-500 text-white ml-auto"
                    : "self-start bg-gray-200 text-gray-800"
                } px-4 py-2 rounded-lg max-w-[80%] break-words`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about water conservation..."
                className="flex-grow border rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;