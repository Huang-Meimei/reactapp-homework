import "../App.css";

function MyMusic() {
  return (
    <div className="Music-wrap">
      <div className="content">
        <div className="animation">
        </div>
        <audio
          className="audio-player"
          controls={true}
          autoPlay={true}
          src="http://f3.htqyy.com/play9/329/mp3/5"
        ></audio>
      </div>
    </div>
  );
}

export default MyMusic;
