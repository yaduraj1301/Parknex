import React from 'react';
import './BuildingStatsCard.css';

// Define the type for the text color prop
type ValueColor = 'black' | 'green' | 'red' | 'blue';

interface BuildingStatsCardProps {
  title: string;
  value: string | number;
  unit: string;
  valueColor?: ValueColor;
}

export const BuildingStatsCard: React.FC<BuildingStatsCardProps> = ({
  title,
  value,
  unit,
  valueColor = 'black', // Default color is black
}) => {
  return (
    <div className="building-stats-card">
      <h4 className="stats-card-title">{title}</h4>
      {/* The valueColor is used as a CSS class */}
      <div className={`stats-card-value ${valueColor}`}>{value}</div>
      <p className="stats-card-unit">{unit}</p>
    </div>
  );
};