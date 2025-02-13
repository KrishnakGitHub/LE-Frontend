interface SettingsPanelProps {
    settings: { fontSize: number; textColor: string; bgColor: string; speed: number };
    setSettings: (settings: any) => void;
  }
  
  const SettingsPanel = ({ settings, setSettings }: SettingsPanelProps) => {
    return (
      <div className="settings-panel">
        <label>Font Size:</label>
        <input
          type="range"
          min="12"
          max="24"
          value={settings.fontSize}
          onChange={(e) => setSettings({ ...settings, fontSize: Number(e.target.value) })}
        />
        <label>Text Color:</label>
        <input
          type="color"
          value={settings.textColor}
          onChange={(e) => setSettings({ ...settings, textColor: e.target.value })}
        />
        <label>Background:</label>
        <input
          type="color"
          value={settings.bgColor}
          onChange={(e) => setSettings({ ...settings, bgColor: e.target.value })}
        />
      </div>
    );
  };
  
  export default SettingsPanel;
  