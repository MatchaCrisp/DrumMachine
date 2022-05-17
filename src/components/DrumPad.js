// external
// react
import {useState, useEffect} from 'react';

// renders button that onclick plays a sound
const DrumPad=props=>{
    //active state: 0=inactive, any int=duration of clip in ms
    const [act, setAct]=useState(0);
  
    //add keydown listener on mount, remove on unmount
    useEffect(()=>{
      document.addEventListener('keydown',handleKey);
      return ()=>{document.removeEventListener('keydown',handleKey)};
    });
  
    const handleKey=e=>{
      if (!props.power) return;
      if (e.keyCode===props.idKey) {
        handleEvent();
      }
    }
    const handleClick=()=>{
      if (!props.power) return;
      handleEvent();
    }
    const handleEvent=()=>{
      //play sound and change display
      props.handleDisplay(props.desc);
      playSound();
    }
  
    //active effect achieved through async settimeout
    const playSound=async()=>{
      const sound=document.getElementById(props.id);
      const dur=Math.round(sound.duration*1000);
      sound.currentTime=0;
      setAct(dur);
      sound.play();
      await new Promise(resolve=>setTimeout(resolve,dur));
      setAct(0);
  
  
    };
  
      return (
        <div className='drum-pad'
             id={`${props.id}butt`} 
             onClick={handleClick}
             >
          <p className="pad-id">{props.id}</p>
          <audio className="clip" id={props.id} src={props.url} />
          <div className="animHelper"
               style={{animation:act?`activated ${act}ms`:'none'}} />
        </div>
      )
  }

  export default DrumPad;