// external
// react
import React, { useState} from 'react';

// internal
// components
import DrumMachine from './components/DrumMachine';

// renders a centered drum machine.
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

  export default App;