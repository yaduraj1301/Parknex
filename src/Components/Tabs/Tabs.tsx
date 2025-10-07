import React, { useState, useEffect, useRef } from "react";
import "./tabs.css";

export interface TabItem {
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultActive?: number;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultActive = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(defaultActive);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const activeButton = header.querySelectorAll<HTMLButtonElement>(".tab-button")[activeIndex];
    if (activeButton) {
      const rect = activeButton.getBoundingClientRect();
      const parentRect = header.getBoundingClientRect();

      header.style.setProperty("--highlight-x", `${rect.left - parentRect.left}px`);
      header.style.setProperty("--highlight-width", `${rect.width}px`);
    }
  }, [activeIndex, tabs]);

  return (
    <div className="tabs-container">
      <div className="tab-header" ref={headerRef}>
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
