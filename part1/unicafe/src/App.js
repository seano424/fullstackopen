import React, { useState } from "react";
import Statistics from "./components/Statistics";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / (good + neutral + bad)) * 100;

  return (
    <div>
      <h1>give feedback</h1>
      <div style={{ display: "flex" }}>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>
      <h1>statistics</h1>
      <div>
        <Statistics text="good" value={good} />
        <Statistics text="neutral" value={neutral} />
        <Statistics text="bad" value={bad} />
        <Statistics text="all" value={all} />
        <Statistics text="average" value={average} />
        <Statistics text="positive" value={positive} />
      </div>
    </div>
  );
};

export default App;
