// renders a toggle button
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

  export default ToggleSwitch;
  