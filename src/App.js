import './App.css';
import { useState, useEffect } from 'react';
import TimerSetting from './components/timerSettings/timerSetting';
let interval;
let initialBreak = 5;
let initialSession = 25;

function App() {
  const [breakTime, setBreakTime] = useState(initialBreak);
  const [sessionTime, setSessionTime] = useState(initialSession);
  const [mins, setMins] = useState(sessionTime);
  const [secs, setSecs] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerStage, setTimerStage] = useState('session');


  const changeTime = (event) => {
    setIsPlaying(false);
    let time = event.target.value;
    let inputId = event.target.id;
    if (time < 1) time = 1;
    if (time > 60) time = 60;
    if (inputId==='break-length') {
      setBreakTime(time);
      if (timerStage === 'break') {
        setMins(time);
        setSecs(0);
      }
    } else if ( inputId==='session-length') {
      setSessionTime(time);
      if (timerStage === 'session'){
        setMins(time);
        setSecs(0);
      }
    }

  }
  
  const resetTimer = () => {
    setIsPlaying(false);
    setTimerStage('session');
    setBreakTime(initialBreak);
    setSessionTime(initialSession);
    setMins(initialSession);
    setSecs(0);
    document.querySelector("#beep").pause();
    document.querySelector('#beep').currentTime = 0;
  }

  useEffect( () => {
    if (isPlaying) interval = setInterval(() => {
      if (secs > 0) {
        setSecs(secs-1);
      } else if (mins > 0) {
        setMins(mins-1);
        setSecs(59);
      } else {
        if (timerStage === "break") {
          setTimerStage("session");
          setMins(sessionTime);
        } else {
          setTimerStage('break');
          setMins(breakTime);
        }
        setSecs(0);
        document.querySelector('#beep').play();
      } 
    }, 1000) 

    return () => clearInterval(interval);
}, [isPlaying, mins, secs, timerStage, breakTime, sessionTime]);

const showTime = () => {
  const formatTime = (n) => {
    if (n < 0 || n === '' || isNaN(n)) return '00';
    if (n > 60) return '60';
    if (n < 10) return '0' + n;
    return n;
  }
  let mm = formatTime(mins);
  let ss = formatTime(secs);
  return `${mm}:${ss}`;
}

const playPause = () => {
  setIsPlaying(!isPlaying);
}

  return (
    <div className="App">
      <div className={`timer-container ${timerStage === "session" ? "primary-bg" : "secondary-bg"}`}>

      <div className='timer'>
        <div id="timer-label" className={timerStage === "session" ? "primary-label" : "secondary-label"}>{timerStage[0].toUpperCase() + timerStage.slice(1,)}</div>
        <div id="time-left" className={timerStage === "session" ? "primary" : "secondary"}>{showTime()}</div>
      </div>

      <div className={`timer-controls ${timerStage === "session" ? "primary" : "secondary"}`}>
        <button id="start_stop" onClick={playPause}><i className={!isPlaying ? "fa fa-play-circle-o": "fa fa-pause-circle-o"} aria-hidden="true"></i></button>
        <button id="reset" onClick={resetTimer}><i className="fa fa-stop-circle-o" aria-hidden="true"></i></button>
      </div>

      <div className={`timer-settings ${timerStage === "session" ? "primary" : "secondary"}`}>
        <TimerSetting name="break" value={breakTime} setValue={changeTime} timerStage={timerStage} ></TimerSetting>
        <TimerSetting name="session" value={sessionTime} setValue={changeTime} timerStage={timerStage} ></TimerSetting>
      </div>

      <audio src='./src/beep.wav' id="beep"></audio>
    </div>
    </div>
  );
}

export default App;
