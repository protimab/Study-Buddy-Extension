import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import SettingsButton from "./SettingsButton";
import {useContext, useState, useEffect, useRef} from "react";
import SettingsContext from "./SettingsContext";
import plantStage1 from "./small_plant.png";
import plantStage2 from "./sapling.jpeg";
import plantStage3 from "./tree.png";
import plantStage4 from "./sapling.jpeg";

const red = '#f54e4e';
const green = '#4aec8c';

function Timer() {
  const settingsInfo = useContext(SettingsContext);
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState('work'); 
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [plantStage, setPlantStage] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    function switchMode() {
      const nextMode = modeRef.current === 'work' ? 'break' : 'work';
      const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;
  
      setMode(nextMode);
      modeRef.current = nextMode;
  
      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
  
      setPlantStage(prevStage => (prevStage + 1) % 4);
    }
  
    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);
  
    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        switchMode();
      }
      tick();

      setElapsedTime(prevTime => prevTime + 1);
    }, 100);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  useEffect(() => {
    if (modeRef.current === 'work' && elapsedTime >= 120) {
      setElapsedTime(0);
      setPlantStage(prevStage => (prevStage + 1) % 4);
    }
  }, [elapsedTime]);
  

  const totalSeconds = mode === 'work'
    ? settingsInfo.workMinutes * 60
    : settingsInfo.breakMinutes * 60;
  const percentage = Math.round(secondsLeft / totalSeconds * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if(seconds < 10) 
    seconds = '0'+seconds;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', height: '100vh' }}>
      <div style={{ marginTop: '20px', width: 300, height: 300, alignItems: 'flex-start' }}>
        <img src={
              plantStage === 0 ? plantStage1 :
              plantStage === 1 ? plantStage2 :
              plantStage === 2 ? plantStage3 :
              plantStage4
            } alt="Plant Stage" style={{ width: '100%', height: 'auto' }} />
        </div>
        
        <div style={{ marginTop: '20px', width: 250, height: 250 }}>
          <CircularProgressbar
            value={percentage}
            text={minutes + ':' + seconds}
            styles={buildStyles({
            textColor:'#fff',
            pathColor:mode === 'work' ? red : green,
            tailColor:'rgba(255,255,255,.2)',
            textSize: '10px',
            textStyle:  {
                fontFamily: 'Courier New', 
                fontSize: '10px', 
            },
          })} />
        </div>

        <div style={{marginTop:'30px'}}>
          {isPaused
               ? <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current = false; }} style={{ width: '40px', height: '40px' }} />
               : <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true; }} style={{ width: '40px', height: '40px' }} />}
        </div>

        <div style={{marginTop:'10px'}}>
          <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
        </div>
    </div>
  );
}
export default Timer;