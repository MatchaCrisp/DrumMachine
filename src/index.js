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
  const [data, setData]=useState({});
  const [curr, setCurr]=useState('');


  return (
    <div id="drum-machine">
      <DrumPads />
      <CtrlPad />
    </div>
  )
}

const CtrlPad=props=>{
  return (
    <div id="ctrl-pad">
      <Power />
      <Display />
      <Swap />
    </div>
    

  )
}
const Power=props=>{
  return (
    <button id="power"></button>
  )
}
const Display=props=>{
  return (
    <p id="display">

    </p>
  )
}
const Swap=props=>{
  return (
    <button id="swap"></button>
  )
}
const DrumPads=props=>{
  //const renderPads=(id,value)=><DrumPad id={id} key={id} value={value} handleClick={()=>padClick(id)}/>
  //const jsx=ids.map(id=>renderPads(id[0],id[1]));
  return (
    <div id="drum-pads">
    </div>
  )
}
//const DrumPad=props=>{
//    return (
//      <button className="drum-pad" id={props.id} onClick={props.handleClick}>{props.id}</button>
//    )
//}
ReactDOM.render(<App/>, document.getElementById('root'));