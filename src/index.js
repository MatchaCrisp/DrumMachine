import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

const App=()=>{
  //app on/off
  const [power, setPower]=useState(true);
  //app audio bank: true = 1, false = 2
  const [bank,setBank]=useState(true);
  //display text
  const [curr, setCurr]=useState('');
  const powerSwitch=e=>{
    setPower(e.target.checked);
    setCurr('');
  }

  const bankSwitch=e=>{
    setBank(e.target.checked);
    setCurr('');
  }

  const handleDisplay=desc=>{
    setCurr(desc);
  }
  return (
    <div id="app" className={bank?'app-bank1':'app-bank2'}>
      <DrumMachine 
        handlePower={powerSwitch} 
        handleBank={bankSwitch}
        handleDisplay={handleDisplay}
        power={power}
        bank={bank}
        curr={curr}/>
    </div>
  )
}

const DrumMachine=props=>{




  return (
    <div id="drum-machine">
      <Display curr={props.curr}/>
      <DrumPads handleDisplay={props.handleDisplay} power={props.power} bank={props.bank}/>
      <CtrlPad handlePower={props.handlePower} handleBank={props.handleBank} power={props.power} bank={props.bank}/>
    </div>
  )
}

const CtrlPad=props=>{
  return (
    <div id="ctrl-pad">
      <ToggleSwitch name="powerTog"
                    id="powerSwit"
                    handleChange={props.handlePower}
                    checky={props.power}
                    tTxt='ON'
                    fTxt='OFF' />
      <ToggleSwitch name="bankTog"
                    id="bankSwit"
                    handleChange={props.handleBank}
                    checky={props.bank}
                    tTxt='&nbsp;&nbsp;1'
                    fTxt='2&nbsp;&nbsp;&nbsp;' />              
    </div>
    

  )
}
const ToggleSwitch =props=>{
  return (
  <div className='tog'>
    <input 
      type="checkbox"
      className='tog-check'
      name={props.name}
      id={props.id}
      disabled={props.dis}
      defaultChecked={props.checky}
      onChange={props.handleChange}
    />
    <label
      className='tog-label'
      htmlFor={props.id}>
      <span className="tog-inner"
            datacustattrt={props.tTxt}
            datacustattrf={props.fTxt}/>
      <span className="tog-switch" />
    </label>
  </div>
  )
}

const Display=props=>{
  return (
    <p id="display">
      {props.curr}
    </p>
  )
}

const DrumPads=props=>{
  //array of audio url and their descriptions
  const [sound, setSound]=useState([]);
  const [url]=useState('https://raw.githubusercontent.com/MatchaCrisp/DrumMachine/main/src/data/soundBite.json');


  const renderPad=items=><DrumPad 
                            key ={items.idKey}
                            idKey={items.idKey}
                            id={items.id}
                            url={props.bank?items.url1:items.url2}
                            desc={props.bank?items.desc1:items.desc2} 
                            power={props.power} 
                            handleDisplay={props.handleDisplay}/>;
  
  //retrieve data on mount                          
  useEffect(()=>{
    if (!url) return;

    const fetchData=async ()=>{
      const response=await fetch(url);
      const data=await response.json();
      setSound(data.soundBite);
      
    }
    fetchData().catch(console.log);

  },[url]);

  const jsx=sound.map(items=>renderPad(items));




  return (
    <div id="drum-pads" className={props.bank?'app-pads1':'app-pads2'}>
      {jsx}
    </div>
  )
}

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
ReactDOM.render(<App/>, document.getElementById('root'));