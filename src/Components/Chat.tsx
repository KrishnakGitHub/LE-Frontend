import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/chat.sass";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const Chat = () => {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState("");
  const [speed, setSpeed] = useState(50); // Typing speed control
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentReadingIndex, setCurrentReadingIndex] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState(16);
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000/ws");

    ws.onopen = () => console.log("Connected to WebSocket");
    ws.onmessage = (event) => handleIncomingMessage(event.data);
    ws.onerror = (error) => console.error("WebSocket Error:", error);
    ws.onclose = () => console.log("WebSocket Disconnected");

    setSocket(ws);
    return () => ws.close();
  }, []);

  const handleIncomingMessage = (text: string) => {
    typeMessageEffect(text, setMessages);
    // if (!isMuted) {
    //   speakText(text, messages.length);
    // }
  };

  const sendMessage = async () => {
    if (!input.trim() || !socket || socket.readyState !== WebSocket.OPEN) return;
    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    socket.send(input);
    setInput("");
  };

  const typeMessageEffect = (text: string, setMessages: any) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setMessages((prev) => {
          const lastMessage = prev.length ? prev[prev.length - 1] : null;
          if (lastMessage && lastMessage.sender === "bot") {
            return [...prev.slice(0, -1), { text: lastMessage.text + text[index], sender: "bot" }];
          } else {
            return [...prev, { text: text[index], sender: "bot" }];
          }
        });
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);
  };

  // const speakText = (text: string, index: number) => {
  //   if (isMuted) {
  //     speechSynthesis.cancel();
  //     return;
  //   }
  //   const utterance = new SpeechSynthesisUtterance(text);
  //   utterance.voice = speechSynthesis.getVoices().find(voice => voice.name.includes("Google")) || null;
  //   utterance.pitch = 1;
  //   utterance.rate = 1;
  //   utterance.onstart = () => setCurrentReadingIndex(index);
  //   utterance.onend = () => setCurrentReadingIndex(null);
  //   speechSynthesis.speak(utterance);
  // };

  return (
    <>
      <Navbar />
      <div className={`app-container ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <Sidebar isCollapsed={isSidebarCollapsed} toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
        <div className={`chat-container ${isSidebarCollapsed ? "expanded" : ""}`} style={{ backgroundColor: bgColor, color: textColor, fontSize: `${fontSize}px` }}>
          {/* <div className="chat-header">
            <div className="speed-control">
              <label>Speed:</label>
              <input
                type="range"
                min="10"
                max="200"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
              />
            </div>
            <div className="audio-controls">
              <button onClick={() => setIsMuted(!isMuted)}>
                {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
              </button>
            </div>
            <div className="customization">
              <label>Font Size:</label>
              <input
                type="range"
                min="12"
                max="24"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
              />
              <label>Text Color:</label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
              />
              <label>Background:</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
            </div>
          </div> */}
          <div className="chat-box">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender} ${currentReadingIndex === index ? "highlight" : ""}`}
              >
                <span>{msg.text}</span>
              </div>
            ))}
          </div>
          <div className="input-box">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;