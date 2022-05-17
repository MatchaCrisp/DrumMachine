// external
// react
import {useState, useEffect} from 'react';

// internal
// components
import DrumPad from './DrumPad';

// renders a 3x3 grid of DrumPad
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

  export default DrumPads;