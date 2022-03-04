const data = [
    {
      keyCode: 81,
      id: "Q",
      des: "Heater-1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
    },
    {
      keyCode: 87,
      id: "W",
      des: "Heater-2",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
    },
    {
      keyCode: 69,
      id: "E",
      des: "Heater-3",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
    },
    {
      keyCode: 65,
      id: "A",
      des: "Heater-4",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
    },
    {
      keyCode: 83,
      id: "S",
      des: "Clap",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
    },
    {
      keyCode: 68,
      id: "D",
      des: "Open-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
    },
    {
      keyCode: 90,
      id: "Z",
      des: "Kick-n-Hat",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
    },
    {
      keyCode: 88,
      id: "X",
      des: "Kick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
    },
    {
      keyCode: 67,
      id: "C",
      des: "Closed-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
    }
]
function DrumPad({des, id, url, setDisplayText, powerStatus, volume}){
    function playClip(clip,displayed){
      clip.volume=volume/100
        setDisplayText(displayed)
        clip.currentTime=0
        clip.play()
    }
    function handleClick(e){
      if(powerStatus){
        const clip=document.querySelector("audio#"+id)
        playClip(clip,des)
      }
    }
    if(powerStatus){
      document.onkeypress = function (e) {
          const clip=document.querySelector("audio#"+e.key.toUpperCase())
          playClip(clip,clip.getAttribute("data-des"))
        }
    }
    return(
        <button 
          className="drum-pad" 
          id={id} 
          onClick={handleClick}
        >
          {id}
          <audio id={id} data-des={des} src={url} className="clip"></audio>
        </button>
    )
}
function Pads({setDisplayText,powerStatus, volume}){
    const list=data.map(item=><DrumPad
                                key={item.id}
                                des={item.des}
                                id={item.id}
                                url={item.url}
                                setDisplayText={setDisplayText}
                                powerStatus={powerStatus}
                                volume={volume}
                            />)
    return(
        <div className="pads">
            {list}
        </div>
    )
}
function Dashboard({displayText, powerStatus, setPowerStatus, volume, setVolume}){
  function handleClick(){
    setPowerStatus(prev=>!prev)
  }
  function handleChange(e){
    setVolume(e.currentTarget.value)
  }
  return(
      <div className="dashboard">
          <button id="display">{displayText}</button>
          <div className="power-vol-wrapper">
            <div className="power-wrapper">
                <div 
                  className="flex power-btn" 
                  style={{transform: powerStatus ? 'translate(11px,0)' : 'translate(0,0)'}} 
                  onClick={handleClick}
                >
                  {powerStatus? "ON" : "OFF"}
                </div>
            </div>
            <input type="range" value={volume} id="volume-control" onChange={handleChange}/>
          </div>
      </div>
  )
}

function DrumMachine(){
    const [displayText, setDisplayText] = React.useState("")
    const [powerStatus, setPowerStatus] = React.useState(true)
    const [volume, setVolume] = React.useState(50)
    return(
        <div id="drum-machine">
            <Dashboard displayText={displayText} powerStatus={powerStatus} setPowerStatus={setPowerStatus} volume={volume} setVolume={setVolume}/>
            <Pads setDisplayText={setDisplayText} powerStatus={powerStatus} volume={volume}/>
        </div>
    )
}
ReactDOM.render(<DrumMachine/>, document.getElementById("root"))