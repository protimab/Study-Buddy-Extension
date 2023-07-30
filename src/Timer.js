import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const red = '#f54e4e'; 
const green = '#4aec8c'
const rotation = 0;
    const strokeLinecap = 'round';


function Timer() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: 200, height: 200 }}>
        <CircularProgressbar value={60} text={`${60}%`} styles ={buildStyles( {rotation, strokeLinecap, 
        textColor: "#fff", 
        pathColor: red,
        tailColor: 'rgba(255,255,255,.2)',
        })}  />
      </div>
    </div>
    );
}

export default Timer;