// src/components/Tabs/Tabs.tsx

import React from 'react';
import styles from './Tabs.module.css'; // Import our CSS module

// Define the shape of a single tab object
export interface TabItem {
  id: string;      // A unique identifier for the tab
  label: string;   // The text to display on the tab
  disabled?: boolean; // Optional: to disable a specific tab
}

// Define the props our Tabs component will accept
interface TabsProps {
  tabs: TabItem[];                    // An array of tab objects
  activeTabId: string;                // The ID of the currently active tab
  onTabClick: (id: string) => void; // A callback function to handle tab clicks
  className?: string;                 // Optional: for custom styling from the parent
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTabId, onTabClick, className }) => {
  return (
    <div className={`${styles.tabsContainer} ${className || ''}`}>
      {tabs.map((tab) => {
        // Determine if the current tab in the loop is the active one
        const isActive = tab.id === activeTabId;

        return (
          <button
            key={tab.id}
            disabled={tab.disabled}
            // Conditionally apply the 'active' class
            className={`${styles.tabButton} ${isActive ? styles.active : ''}`}
            onClick={() => onTabClick(tab.id)}
            // ARIA attributes for better accessibility
            role="tab"
            aria-selected={isActive}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;