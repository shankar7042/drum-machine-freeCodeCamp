const data = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const App = () => {
  const [id, setId] = React.useState(data[0].id);
  const [volume, setVolume] = React.useState(1);
  const [recording, setRecording] = React.useState("");

  const playRecording = () => {
    let index = 0;
    const recordArr = recording.split(" ");
    const interval = setInterval(() => {
      const audio = document.getElementById(recordArr[index]);
      audio.currentTime = 0;
      audio.volume = volume;
      setId(id);
      audio.play();
      index++;
    }, 500);
    setTimeout(() => clearInterval(interval), 300 * recordArr.length - 1);
  };

  return (
    <div className="container" id="display">
      <div className="main">
        {data.map((item) => (
          <Box
            key={item.keyCode}
            {...item}
            setId={setId}
            volume={volume}
            setRecording={setRecording}
          />
        ))}
      </div>
      <div className="meta">
        <h3 className="id">{id}</h3>
        <div>
          <h5>Volume</h5>
          <input
            type="range"
            step="0.01"
            min="0"
            max="1"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
          {parseInt(volume * 100)}
        </div>
        <div>
          <h3>{recording}</h3>
          {recording && (
            <div>
              <button onClick={playRecording}>play</button>
              <button onClick={() => setRecording("")}>clear</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function Box({ keyTrigger, url, keyCode, id, setId, volume, setRecording }) {
  const [active, setActive] = React.useState(false);
  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.keyCode === keyCode) {
      playSound();
    }
  };

  const playSound = () => {
    const audio = document.getElementById(keyTrigger);
    audio.currentTime = 0;
    audio.volume = volume;
    setId(id);
    setActive(true);
    setTimeout(() => setActive(false), 200);
    setRecording((prevRecord) => prevRecord + keyTrigger + " ");
    audio.play();
  };

  return (
    <div
      className={`drum-pad ${active && "active"}`}
      id={id}
      onClick={playSound}
    >
      {keyTrigger}
      <audio src={url} className="clip" id={keyTrigger} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("drum-machine"));
