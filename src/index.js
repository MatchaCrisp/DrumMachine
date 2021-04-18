import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import './index.scss';

const App=()=>{
  return (
    <div id="app">
      <DrumMachine />
    </div>
  )
}
const DrumMachine=()=>{
  
  const [curr, setCurr]=useState('');
  const [power, setPower]=useState(true);
  //true = 1, false = 2
  const [bank,setBank]=useState(true);


  const powerSwitch=()=>{
    setPower(!power);
  }

  const bankSwitch=()=>{
    setBank(!bank);
  }

  const handleDisplay=desc=>{
    setCurr(desc);
  }

  return (
    <div id="drum-machine">

      <DrumPads handleDisplay={handleDisplay} power={power} bank={bank}/>
      <p>{`power is ${power}`}</p>
      <p>{`bank is ${bank?1:2}`}</p>
      <CtrlPad handlePower={powerSwitch} handleBank={bankSwitch} curr={curr}/>
    </div>
  )
}

const CtrlPad=props=>{
  return (
    <div id="ctrl-pad">
      <Power handlePower={props.handlePower}/>
      <Display curr={props.curr}/>
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
    <div id="drum-pads">
      {jsx}
    </div>
  )
}
const DrumPad=props=>{
  
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
    sound.currentTime=0;
    sound.play();
  };
  //handle keydown event
    return (
      <div className="drum-pad" id={`${props.id}butt`} onClick={handleClick}>{props.id}
        <audio className="clip" id={props.id} src={props.url} />
      </div>
    )
}
ReactDOM.render(<App/>, document.getElementById('root'));