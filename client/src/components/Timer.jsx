import React, { useEffect, useState } from "react";

export default function Timer({ onExpire }) {
  const [remaining, setRemaining] = useState(600);

  useEffect(() => {
    if (remaining <= 0) {
      onExpire();
      return;
    }
    const t = setTimeout(() => setRemaining(remaining - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining, onExpire]);

  const hrs = String(Math.floor(remaining / 3600)).padStart(2, "0");
  const mins = String(Math.floor((remaining % 3600) / 60)).padStart(2, "0");
  const secs = String(remaining % 60).padStart(2, "0");

  return (
    <>
      <div className="header-nav">Time Left</div>
      <div className="timer">
        <div className="time-blocks">
          <div className="time-block">
            <div className="time-value">{hrs}</div>
            <div className="time-label">hours</div>
          </div>
          <div className="time-block">
            <div className="time-value">{mins}</div>
            <div className="time-label">minutes</div>
          </div>
          <div className="time-block">
            <div className="time-value">{secs}</div>
            <div className="time-label">seconds</div>
          </div>
        </div>
      </div>
    </>
  );
}
