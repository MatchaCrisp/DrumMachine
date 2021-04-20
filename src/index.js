import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

const App=()=>{
  const [power, setPower]=useState(true);
  //true = 1, false = 2
  const [bank,setBank]=useState(true);
  const powerSwitch=()=>{
    setPower(!power);
  }

  const bankSwitch=()=>{
    setBank(!bank);
  }
  return (
    <div id="app" className={bank?'app-bank1':'app-bank2'}>
      <DrumMachine 
        handlePower={powerSwitch} 
        handleBank={bankSwitch}
        power={power}
        bank={bank}/>
    </div>
  )
}
const DrumMachine=props=>{
  const [curr, setCurr]=useState('');
  const handleDisplay=desc=>{
    setCurr(desc);
  }

  return (
    <div id="drum-machine">
      <Display curr={curr}/>
      <DrumPads handleDisplay={handleDisplay} power={props.power} bank={props.bank}/>
      <CtrlPad handlePower={props.handlePower} handleBank={props.handleBank}/>
    </div>
  )
}

const CtrlPad=props=>{
  return (
    <div id="ctrl-pad">
      
      <Power handlePower={props.handlePower}/>
      <Swap handleBank={props.handleBank}/>
    </div>
    

  )
}
const Power=props=>{
  return (
    <button id="power" onClick={props.handlePower}>Power</button>
  )
}
const Display=props=>{
  return (
    <p id="display">
      {props.curr}
    </p>
  )
}
const Swap=props=>{
  return (
    <button id="swap" onClick={props.handleBank}>Swap</button>
  )
}
const DrumPads=props=>{
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
  const [act, setAct]=useState(false);
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
    console.log(props.url);
  }

  const playSound=()=>{
    const sound=document.getElementById(props.id);
    const dur=sound.duration;
    sound.currentTime=0;
    console.log(dur);
    setAct(!act);
    sound.play();
    setTimeout(setAct(!act),dur);

  };
  //handle keydown event
    return (
      <div className={`drum-pad ${act?'butt-active':''}`} id={`${props.id}butt`} onClick={handleClick}>
        <p id="pad-id">{props.id}</p>
        <audio className="clip" id={props.id} src={props.url} />
      </div>
    )
}
ReactDOM.render(<App/>, document.getElementById('root'));