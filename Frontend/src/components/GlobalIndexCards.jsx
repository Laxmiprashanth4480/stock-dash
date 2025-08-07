import React from "react";
import "./GlobalIndexCards.css";

const GlobalIndexCards = () => {
  const indices = [
    { name: "NIFTY 50", value: 22500.65, change: "+125.35", status: "up" },
    { name: "SENSEX", value: 74800.12, change: "-89.10", status: "down" },
    { name: "NASDAQ", value: 13720.9, change: "+45.20", status: "up" },
  ];

  return (
    <div className="global-indices-container">
      {indices.map((index, i) => (
        <div
          key={i}
          className={`index-card ${
            index.status === "up" ? "green-border" : "red-border"
          }`}
        >
          <h5 className="index-title">{index.name}</h5>
          <h6 className="index-value">{index.value.toLocaleString()}</h6>
          <p
            className={`index-change ${
              index.status === "up" ? "green-text" : "red-text"
            }`}
          >
            {index.change} {index.status === "up" ? "📈" : "📉"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default GlobalIndexCards;
