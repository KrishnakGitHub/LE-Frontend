interface ChatInputProps {
    input: string;
    setInput: (value: string) => void;
    sendMessage: () => void;
  }
  
  const ChatInput = ({ input, setInput, sendMessage }: ChatInputProps) => {
    return (
      <div className="input-box">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    );
  };
  
  export default ChatInput;
  