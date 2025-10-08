import React, { useState, useEffect } from "react";
import "./tabs.css";

export interface TabItem {
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultActive?: number;
  activeIndex?: number; // Parent can set initial active tab
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultActive = 0,
  activeIndex: externalActiveIndex,
}) => {
  const [activeIndex, setActiveIndex] = useState(
    externalActiveIndex ?? defaultActive
  );

  // Update active index when external activeIndex changes (from navigation)
  useEffect(() => {
    if (externalActiveIndex !== undefined) {
      setActiveIndex(externalActiveIndex);
    }
  }, [externalActiveIndex]);

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
