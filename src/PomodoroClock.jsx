import React, { useState, useEffect } from 'react';
import './Pomodoro.css';


  function PomodoroClock() {
  const [workTime, setWorkTime] = useState(25 * 60); 
  const [breakTime, setBreakTime] = useState(5 * 60); 
  const [cycleCount, setCycleCount] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [displayTime, setDisplayTime] = useState(5);


  useEffect(() => {
    const timer = setInterval(() => {
      if (!isBreak) {
        if (workTime > 0) {
          setWorkTime(workTime - 1);
        } else {
          setIsBreak(true);
          setWorkTime(25 * 60);
        }
      } else {
        if (breakTime > 0) {
          setBreakTime(breakTime - 1);
        } else {
          if (cycleCount + 1 < 2) {
            setIsBreak(false);
            setBreakTime(5 * 60);
            setCycleCount(cycleCount + 1);
          } else {
            clearInterval(timer);
            console.log("Pomodoro session finished!");
          }
        }
      }
    }, 1000);


    return () => clearInterval(timer);
  }, [workTime, breakTime, isBreak, cycleCount]);

  useEffect(() => {
    if (isBreak) {
      setDisplayTime(breakTime % 60);
    } else {
      setDisplayTime(5);
    }
  }, [breakTime, isBreak]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="pomodoro-container">
      <h1 className="pomodoro-heading">Pomodoro Clock</h1>
      <div className="timer-container">
        <div className="timer">
          <h2 className="timer-label">{isBreak ? 'Break Time' : 'Work Time'}</h2>

          <h3 className="timer-display">{isBreak ? formatTime(breakTime) : formatTime(workTime)}</h3>

          {isBreak && <h4 className="break-timer">{`Break Timer: ${displayTime} sec`}</h4>}
        </div>
      </div>

      <div className="cycle-count">
        <h4>Completed Cycles: {cycleCount} / 2</h4>
      </div>
    </div>
  );
};

export default PomodoroClock;
                                                                           
 

