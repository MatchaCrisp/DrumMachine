// internal
// components
import Display from './Display';
import DrumPads from './DrumPads';
import CtrlPad from './CtrlPad';

// renders the full drum machine, with on/off, sound library swap, a display of current sound, and the drumpad grid
const DrumMachine=props=>{
    return (
      <div id="drum-machine">
        <Display curr={props.curr}/>
        <DrumPads handleDisplay={props.handleDisplay} power={props.power} bank={props.bank}/>
        <CtrlPad handlePower={props.handlePower} handleBank={props.handleBank} power={props.power} bank={props.bank}/>
      </div>
    )
  }
  
  
  export default DrumMachine;