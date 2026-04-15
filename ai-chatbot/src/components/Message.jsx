function Message({ text, sender }) {
  return (
    <div className={`flex ${sender === "user" ? "justify-end" : "justify-start"} my-2`}>
      
      <div
        className={`
          px-4 py-2 rounded-2xl max-w-xs shadow-md text-sm
          ${sender === "user"
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-white text-gray-800 border rounded-bl-none"}
        `}
      >
        {text}
      </div>

    </div>
  );
}

export default Message;