import { StatCard } from "../StatsCard/StatsCard";
import "../DashboardOverview/dashboardOverview.css";

export function DashboardOverview() {
  return (
    <div className="dashboard-overview">
      <div className="stats-card-container">
        <StatCard title="Total" totalSlots={50} />
        <StatCard title="Available" totalSlots={50} currentStatSlots={8} />
        <StatCard title="Booked" totalSlots={50} currentStatSlots={3} />
        <StatCard title="Pre-Booked" totalSlots={50} currentStatSlots={10} />
        <StatCard title="Named" totalSlots={50} currentStatSlots={2} />
      </div>
      <div className="stats-card-container">
        <StatCard title="Total" totalSlots={50} />
        <StatCard title="Available" totalSlots={50} currentStatSlots={8} />
        <StatCard title="Booked" totalSlots={50} currentStatSlots={3} />
        <StatCard title="Pre-Booked" totalSlots={50} currentStatSlots={10} />
        <StatCard title="Named" totalSlots={50} currentStatSlots={2} />
      </div>
      <div className="stats-card-container">
        <StatCard title="Total" totalSlots={50} />
        <StatCard title="Available" totalSlots={50} currentStatSlots={8} />
        <StatCard title="Booked" totalSlots={50} currentStatSlots={3} />
        <StatCard title="Pre-Booked" totalSlots={50} currentStatSlots={10} />
        <StatCard title="Named" totalSlots={50} currentStatSlots={2} />
      </div>
      
      
    </div>
  );
}
