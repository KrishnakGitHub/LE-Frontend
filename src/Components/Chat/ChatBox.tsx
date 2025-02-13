interface ChatBoxProps {
    messages: { text: string; sender: string }[];
    currentReadingIndex: number | null;
  }
  
  const ChatBox = ({ messages, currentReadingIndex }: ChatBoxProps) => {
    return (
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender} ${currentReadingIndex === index ? "highlight" : ""}`}>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
    );
  };
  
  export default ChatBox;
  