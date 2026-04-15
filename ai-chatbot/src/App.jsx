import { useState, useEffect, useRef } from "react";
import ChatBox from "./components/ChatBox";
import InputBox from "./components/InputBox";

function App() {
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  // ✅ NEW (auto scroll ref)
  const chatEndRef = useRef(null);

  // ✅ NEW (auto scroll effect)
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      text,
      sender: "user",
    };

    const chatId = Date.now();

    // 🔥 NEW CHAT (sidebar ke liye)
    const newChat = {
      id: chatId,
      title: text.length > 25 ? text.slice(0, 25) + "..." : text,
      messages: [userMessage],
    };

    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(chatId);

    // ✅ messages append (delete nahi honge)
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      const botMessage = {
        text: data.reply,
        sender: "bot",
      };

      // sidebar chat update
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId
            ? { ...chat, messages: [...chat.messages, botMessage] }
            : chat
        )
      );

      // ✅ append
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex h-screen bg-white">

      {/* Sidebar */}
      <div className="w-48 py-4 flex flex-col border-r">

        <button
          onClick={() => {
            setMessages([]);
            setActiveChatId(null);
          }}
          className="text-sm pl-3 py-2 rounded-md hover:bg-gray-100 text-left"
        >
          + New Chat
        </button>

        <div className="mt-4 text-xs text-gray-400 pl-3">
          Chats
        </div>

        <div className="mt-2 space-y-1 text-sm">
          {chats.length === 0 ? (
            <div className="text-gray-400 text-xs pl-3">
              No chats yet
            </div>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => {
                  setActiveChatId(chat.id);
                  setMessages(chat.messages);
                }}
                className={`pl-3 py-2 rounded-md cursor-pointer truncate hover:bg-gray-100 ${
                  activeChatId === chat.id ? "bg-gray-200" : ""
                }`}
              >
                {chat.title}
              </div>
            ))
          )}
        </div>

      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">

        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="w-full max-w-2xl text-center">
              <h1 className="text-2xl font-semibold mb-6">
                What’s on the agenda today?
              </h1>
              <InputBox sendMessage={sendMessage} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full h-full justify-end">

            {/* ✅ Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto w-full flex justify-end pr-2">
              <div className="w-full max-w-2xl">
                <ChatBox messages={messages} />
                
                {/* ✅ NEW (scroll target) */}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* ✅ Input Bottom Center */}
            <div className="w-full flex justify-center pb-4">
              <div className="w-full max-w-2xl">
                <InputBox sendMessage={sendMessage} />
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default App;