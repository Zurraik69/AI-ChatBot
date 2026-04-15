import Message from "./Message";

function ChatBox({ messages }) {
  return (
    // <div className="flex-1 p-4 overflow-y-auto bg-gray-100">

    //   {messages.length === 0 && (
    //     <div className="text-gray-500 text-center mt-10">
    //       No messages yet...
    //     </div>
    //   )}

    //   {messages.map((msg, index) => (
    //     <Message key={index} text={msg.text} sender={msg.sender} />
    //   ))}

    // </div>

     <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((msg, index) => (
        <Message key={index} text={msg.text} sender={msg.sender} />
      ))}
    </div>
    
  );
}

export default ChatBox;