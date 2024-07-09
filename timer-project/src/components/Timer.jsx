/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const Timer = () => {
  const [timerValue, setTimerValue] = useState("");
  const [countdown, setCountdown] = useState(null);
  const [timerHistory, setTimerHistory] = useState([]);

  const refInput = useRef(null);

  useEffect(() => {
    let countdownInterval;
    if (countdown !== null && countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      addToHistory();
    }

    return () => clearInterval(countdownInterval);
  }, [countdown]);

  const addToHistory = () => {
    setTimerHistory((prev) => [...prev, countdown]);
    setCountdown(null);
  };
  const startTimer = (e) => {
    e.preventDefault();
    setCountdown(parseInt(timerValue, 10));
  };
  const handleTimerChange = (e) => {
    setTimerValue(e.target.value);
  };
  const stopTimer = () => {
    refInput.current.focus();
    addToHistory();
    setCountdown(null);
    setTimerValue("");
  };
  const resetTimer = () => {
    addToHistory();
  };

  return (
    <div>
      <h1>Timer</h1>
      <form action="" onSubmit={startTimer}>
        <input
          ref={refInput}
          type="number"
          value={timerValue}
          onChange={handleTimerChange}
        />
        <button type="submit">Start Timer</button>
        <button onClick={stopTimer}>Stop Timer</button>
        <button onClick={resetTimer}>Reset Timer</button>
        {countdown !== null && <div>Countdown: {countdown}</div>}
        <h2>Timer History: </h2>
        <ul>
          {timerHistory.map((time, index) => (
            <li key={index}>{time}</li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default Timer;
