import React, {useState} from 'react';
import ReactDOM from 'react-dom';
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
      <CtrlPad handlePower={powerSwitch} handleBank={bankSwitch} curr={curr}/>
    </div>
  )
}

const CtrlPad=props=>{
  return (
    <div id="ctrl-pad">
      <Power handlePower={props.powerSwitch}/>
      <Display curr={props.curr}/>
      <Swap handleBank={props.bankSwitch}/>
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
  const [data, setData]=useState({});
  const [url]=useState('https://raw.githubusercontent.com/MatchaCrisp/DrumMachine/main/src/data/soundBite.json');

  useEffect=(()=>{
    if (!url) return;

    const fetchData=async ()=>{
      const response=await fetch(url);
      const data=await response.json();

      setData(data);
    }
    fetchData().catch(console.log);

  },[url]);


  const renderPad=items=><DrumPad key ={items.idKey} items={items} power={props.power} bank={props.bank} handleDisplay={props.handleDisplay}/>;

  const jsx=data.soundBite.map(items=>renderPad(items));


  return (
    <div id="drum-pads">
      {jsx}
    </div>
  )
}
const DrumPad=props=>{
  const sound=props.items;
  const handleClick=()=>{
    if (!props.power) return;
    //play sound and change display
    props.handleDisplay(props.bank?sound.desc1:sound.desc2);
    console.log(bank?sound.url1:sound.url2);
  }
  //handle keydown event
    return (
      <button className="drum-pad" id={sound.id} onClick={handleClick}>{props.id}</button>
    )
}
ReactDOM.render(<App/>, document.getElementById('root'));