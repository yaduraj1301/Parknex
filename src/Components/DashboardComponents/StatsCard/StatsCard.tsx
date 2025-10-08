import "./statsCard.css"

export interface StatCardProps {
  title: string;
  totalSlots: number;
  currentStatSlots?: number;
}

export function StatCard({
  title,
  totalSlots,
  currentStatSlots = undefined,
}: StatCardProps) {
  let percentage = 0
  if (currentStatSlots !== undefined) {
     percentage = (currentStatSlots / totalSlots) * 100;
  }

  const cardClass = `dashboard-stats-card ${title.toLowerCase().replace(/\s+/g, ".")}`;

  return (
    <article className={cardClass}>
      <div className="top-section">
        <div className="card-text-section">
          <span className="dashboard-stats-card-title">{title}</span>
          {currentStatSlots === undefined ? (
            <p className="dashboard-stat-number">{totalSlots}</p>
          
          ) : (
            <p className="dashboard-stat-number">
              {currentStatSlots}{" "}
              <span className="dashboard-stat-total">/ {totalSlots} </span>
            </p>
          )}
        </div>
        <div className="icon-section">
          <i className="fa-solid fa-car-side dashboard-stats-icon"></i>
        </div>
      </div>
      {currentStatSlots !== undefined ? (
        <div className="bottom-section">
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <div className="percentage">{percentage} %</div>
        </div>
      ):null}
    </article>
  );
}
