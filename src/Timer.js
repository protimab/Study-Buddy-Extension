import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import SettingsButton from './SettingsButton';
import { useContext } from 'react';
import SettingsContext from './SettingsContext';

const red = '#f54e4e'; 
const green = '#4aec8c'
const rotation = 0;
    const strokeLinecap = 'round';


function Timer() {
    const settingsInfo = useContext(SettingsContext);
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: 200, height: 200 }}>
        <CircularProgressbar value={60} text={`${60}%`} styles ={buildStyles( {rotation, strokeLinecap, 
        textColor: "#fff", 
        pathColor: red,
        tailColor: 'rgba(255,255,255,.2)',
        })}  />
        <div style= {{marginTop: '20px'}}>
            <PlayButton />
            <PauseButton />
        </div>
        <div style= {{marginTop: '20px'}}>
            <SettingsButton onClick= {() => settingsInfo.setShowSettings(true)} />
        </div>
      </div>
    </div>
    );
}

export default Timer;