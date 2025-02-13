import { useState } from "react";
import "../styles/sidebar.sass";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? "➤" : "◄"}
      </button>
      {!collapsed && <div className="menu-items">Menu Items Here</div>}
    </div>
  );
};

export default Sidebar;
