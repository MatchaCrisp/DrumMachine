// internal
// components
import ToggleSwitch from './ToggleSwitch';

// renders container with two toggles
// one that swaps between two sets of soundbites
// one that turns the drum machine on/off
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

  export default CtrlPad;