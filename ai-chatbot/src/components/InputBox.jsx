// import { useState } from "react";

// function InputBox({ sendMessage }) {
//   const [message, setMessage] = useState("");

//   const handleSend = () => {
//     if (!message.trim()) return;
//     sendMessage(message);
//     setMessage("");
//   };

//   // 🔥 NEW: Enter key handle
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       handleSend();
//     }
//   };

//   return (
//     <div className="p-4 border-t flex gap-2 bg-white">
//       <input
//         type="text"
//         className="flex-1 border rounded-lg p-2 outline-none"
//         placeholder="Type your message..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         onKeyDown={handleKeyDown}   // 🔥 yahi important line hai
//       />

//       <button
//         onClick={handleSend}
//         className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//       >
//         Send
//       </button>
//     </div>
//   );
// }

// export default InputBox;

import { useState } from "react";

function InputBox({ sendMessage }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(message);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex items-center border rounded-full px-4 py-2 shadow-sm">
      
      <input
        type="text"
        className="flex-1 outline-none"
        placeholder="Ask anything"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button
        onClick={handleSend}
        className="ml-2 bg-black text-white px-4 py-1 rounded-full"
      >
        ↑
      </button>

    </div>
  );
}

export default InputBox;