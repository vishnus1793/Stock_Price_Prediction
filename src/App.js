import React, { useState } from "react";
import "./App.css";

function App() {
  const [high, setHigh] = useState("");
  const [low, setLow] = useState("");
  const [open, setOpen] = useState("");
  const [volume, setVolume] = useState("");
  const [result, setResult] = useState("");

  const handlePredict = async () => {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ high, low, open, volume }),
    });
    const data = await response.json();
    setResult(data["res-top"]);
  };

  return (
    <div className="app">
      <h1>Stock Prediction App</h1>
      <div className="input-container">
        <label>High</label>
        <input
          type="number"
          value={high}
          onChange={(e) => setHigh(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label>Low</label>
        <input
          type="number"
          value={low}
          onChange={(e) => setLow(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label>Open</label>
        <input
          type="number"
          value={open}
          onChange={(e) => setOpen(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label>Volume</label>
        <input
          type="number"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
      </div>
      <button onClick={handlePredict}>Predict</button>
      {result && <div className="result">Prediction: {result}</div>}
    </div>
  );
}

export default App;
