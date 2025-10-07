import React, { useState } from "react";

import "./tabs.css";

export interface TabItem {
  label: string;
  content: React.ReactNode; // what to render inside the tab
}

export interface TabsProps {
  tabs: TabItem[];
  defaultActive?: number;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultActive = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(defaultActive);

  return (
    <div className="tabs-container">
        
      <div className="tab-header">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${index === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">{tabs[activeIndex].content}</div>
    </div>
  );
};
