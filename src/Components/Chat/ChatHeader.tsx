import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

interface ChatHeaderProps {
  settings: { fontSize: number; textColor: string; bgColor: string; speed: number };
  setSettings: (settings: any) => void;
  isMuted: boolean;
  setIsMuted: (mute: boolean) => void;
}

const ChatHeader = ({ settings, setSettings, isMuted, setIsMuted }: ChatHeaderProps) => {
  return (
    <div className="chat-header">
      <div className="speed-control">
        <label>Speed:</label>
        <input
          type="range"
          min="10"
          max="200"
          value={settings.speed}
          onChange={(e) => setSettings({ ...settings, speed: Number(e.target.value) })}
        />
      </div>
      <div className="audio-controls">
        <button onClick={() => setIsMuted(!isMuted)}>
          {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
