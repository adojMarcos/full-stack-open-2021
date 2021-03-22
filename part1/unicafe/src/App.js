import React, { useState } from "react";

const Statistic = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
);

const Statistics = (props) => {
  return (
    <>
      <thead>
        <tr>
          <th>Statistics</th>
        </tr>
      </thead>
      <tbody>
        <Statistic text="good" value={props.good} />
        <Statistic text="neutral" value={props.neutral} />
        <Statistic text="bad" value={props.bad} />
        <Statistic text="all" value={props.all} />
        <Statistic text="average" value={props.average} />
        <Statistic text="positive" value={props.positive} />
      </tbody>
    </>
  );
};

const Button = (props) => (
  <button onClick={props.handleGoodClick}>{props.text}</button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const average = (good * 1 + neutral * 0 + bad * -1) / all || 0;
  const positive = (good * 100) / all || 0;

  const handleGoodClick = () => {
    setAll(all + 1);
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setAll(all + 1);
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setAll(all + 1);
    setBad(bad + 1);
  };

  return (
    <>
      <div>
        <h1>Give feedback</h1>
        <Button text={"good"} handleGoodClick={handleGoodClick} />
        <Button text={"neutral"} handleGoodClick={handleNeutralClick} />
        <Button text={"bad"} handleGoodClick={handleBadClick} />
      </div>

      {all ? (
        <table>
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            average={average}
            positive={positive}
          />
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
};

export default App;
