import "./attentionCard.css";

interface AttentionCardProps {
  title: string;
  message: string;
  type: "pending-approval" | "reports";
  onButtonClick: () => void;
}
// const icon = <i className="fa fa-warning"></i>;
export function AttentionCard({ title, message, type, onButtonClick}: AttentionCardProps) {
  return (
    <div className={`attention-card ${type}`}>
      <div className="left-section">
        <div className="attention-icon">
          <img
            width="44"
            height="44"
            src="https://img.icons8.com/pastel-glyph/64/dc143c/error--v1.png"
            alt="error--v1"
          />
        </div>
        <div className="attention-content">
          <div className="attention-text">
            <span className="card-title">{title}</span>
            <p>{message}</p>
          </div>
        </div>
      </div>
      <button className="attention-button" onClick={onButtonClick}>View Detail</button>
    </div>
  );
}
