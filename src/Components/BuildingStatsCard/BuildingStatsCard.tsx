import React from 'react';
import './BuildingStatsCard.css';

interface BuildingStatsCardProps {
  title: string;
  value: string;
  unit: string;
  type?: 'percentage';
}

const BuildingStatsCard: React.FC<BuildingStatsCardProps> = ({ title, value, unit, type }) => {
  return (
    <div className="stats-card">
      <h4 className="stats-card-title">{title}</h4>
      <div className="stats-card-value">{value}</div>
      <p className="stats-card-unit">{unit}</p>
      {type === 'percentage' && (
        <div className="stats-card-progress-bar">
          <div className="progress-fill" style={{ width: value }}></div>
        </div>
      )}
    </div>
  );
};

export default BuildingStatsCard;