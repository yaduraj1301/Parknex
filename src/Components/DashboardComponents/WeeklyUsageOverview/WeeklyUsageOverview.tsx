import React from "react";
import { TrendingUp } from "lucide-react";
import "./WeeklyUsageOverview.css";

interface DataPoint {
  day: string;
  value: number;
}

interface WeeklyUsageOverviewProps {
  data: DataPoint[];
  peakDay: string;
  lowDay: string;
  weeklyAvg: number;
}

export const WeeklyUsageOverview: React.FC<WeeklyUsageOverviewProps> = ({
  data,
  peakDay,
  lowDay,
  weeklyAvg,
}) => {
  // Y-axis labels (4 points)
  const yAxisLabels = [40, 30, 20, 10];
  const maxValue = 40;
  const minValue = 10;

  // Calculate percentage height for each bar
  const getBarHeight = (value: number) => {
    return ((value - minValue) / (maxValue - minValue)) * 100;
  };

  return (
    <div className="weekly-usage-container">
      {/* Header */}
      <div className="graph-header">
        <div className="header-title">
          <TrendingUp className="header-icon" />
          <h3>Weekly Usage Overview</h3>
        </div>
        <p className="graph-subtitle">Average slots occupied by day</p>
      </div>

      {/* Graph */}
      <div className="graph-wrapper">
        {/* Y-axis labels */}
        <div className="y-axis">
          {yAxisLabels.map((label) => (
            <div key={label} className="y-axis-label">
              {label}
            </div>
          ))}
        </div>

        {/* Chart area */}
        <div className="chart-area">
          {/* Grid lines */}
          <div className="grid-lines">
            {yAxisLabels.map((_, index) => (
              <div key={index} className="grid-line"></div>
            ))}
          </div>

          {/* Bar Chart */}
          <div className="bar-chart">
            {data.map((point, index) => {
              const height = getBarHeight(point.value);

              return (
                <div key={index} className="bar-column">
                  <div className="bar-wrapper">
                    <div className="bar" style={{ height: `${height}%` }}>
                      <span className="bar-value">{point.value}</span>
                    </div>
                  </div>
                  <div className="bar-label">
                    <div className="x-axis-dot"></div>
                    <span>{point.day}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <p className="x-axis-title"> <span className="bold">x-axis : </span>days <span className="bold">y-axis : </span>slots</p>

      {/* Usage Insights */}
      <div className="usage-insights">
        <h4>Usage Insights</h4>
        <div className="insights-grid">
          <div className="insight-row">
            <span className="insight-label">Peak Day</span>
            <span className="insight-value peak">{peakDay}</span>
          </div>
          <div className="insight-row">
            <span className="insight-label">Low Day</span>
            <span className="insight-value low">{lowDay}</span>
          </div>
          <div className="insight-row">
            <span className="insight-label">Weekly Avg</span>
            <span className="insight-value avg">{weeklyAvg}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
