import { StatCard } from "../StatsCard/StatsCard";
import "../DashboardOverview/dashboardOverview.css";
import { WeeklyUsageOverview } from "../WeeklyUsageOverview/WeeklyUsageOverview";
import { AttentionCard } from "../AttentionCard/AttentionCard";
import { UpcomingReservations } from "../UpcomingReservation/UpcomingReservation";

export function DashboardOverview() {
  const data = [
    { day: "Sun", value: 10 },
    { day: "Mon", value: 28 },
    { day: "Tue", value: 32 },
    { day: "Wed", value: 22 },
    { day: "Thu", value: 25 },
    { day: "Fri", value: 33 },
    { day: "Sat", value: 30 },
  ];
  const peakDay = "Friday";
  const lowDay = "Sunday";
  const weeklyAvg = 36;

  const noOfPendingRequests = 5;
  const attentionMessage = `You have ${noOfPendingRequests} pending requests to approve.`;
  const reservations = [
    {
      id: "1",
      name: "John Smith",
      slotNumber: "A15",
      time: "09:00 AM",
      reservationId: "#R001",
      status: "today" as const,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      slotNumber: "A23",
      time: "11:30 AM",
      reservationId: "#R002",
      status: "today" as const,
    },
    {
      id: "3",
      name: "Mike Davis",
      slotNumber: "A07",
      time: "02:00 PM",
      reservationId: "#R003",
      status: "today" as const,
    },
    {
      id: "4",
      name: "Mike Davis",
      slotNumber: "A07",
      time: "02:00 PM",
      reservationId: "#R003",
      status: "tomorrow" as const,
    },
    {
      id: "5",
      name: "Mike Davis",
      slotNumber: "A07",
      time: "02:00 PM",
      reservationId: "#R003",
      status: "upcoming" as const,
    },
  ];

  const handleViewAllReservations = () => {
    console.log("View all reservations clicked");
    // Navigate to reservations page or open modal
  };

  return (
    <div className="dashboard-overview">
      <div className="stats-card-container">
        <StatCard title="Total" totalSlots={50} />
        <StatCard title="Available" totalSlots={50} currentStatSlots={8} />
        <StatCard title="Booked" totalSlots={50} currentStatSlots={3} />
        <StatCard title="Pre-Booked" totalSlots={50} currentStatSlots={10} />
        <StatCard title="Named" totalSlots={50} currentStatSlots={2} />
      </div>
      <section className="mid-container">
        <div className="mid-left">
          <WeeklyUsageOverview
            data={data}
            peakDay={peakDay}
            lowDay={lowDay}
            weeklyAvg={weeklyAvg}
          />
        </div>

        <div className="mid-right">
          <AttentionCard
            title={"Pending Requests"}
            message={attentionMessage}
            type={"pending-approval"}
          />
          <div className="upcoming-card-container">
            <UpcomingReservations
              reservations={reservations}
              onViewAll={handleViewAllReservations}
            />
          </div>

          {/* <div style={{ backgroundColor: "white" ,border:"2px solid black" ,minWidth:"400px"}}>hola</div> */}
        </div>
      </section>
    </div>
  );
}
