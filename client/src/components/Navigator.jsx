export default function Navigator({ status, current, onJump }) {
  return (
    <>
      <div className="header-nav">Questions</div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", padding: "24px" }}>
        {status.map((st, index) => (
          <div
            key={index}
            onClick={() => onJump(index)}
            style={{
              margin: 4,
              padding: 8,
              cursor: "pointer",
              background:
                index === current ? "#007bff" : st === 0 ? "red" : st === 1 ? "#ffc107" : "#28a745",
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </>
  );
}
