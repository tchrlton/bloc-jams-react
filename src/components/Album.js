import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      volume: 1,
      isPlaying: false,
      isHovered: false
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumeupdate: e => {
        this.setState({ volume: this.audioElement.volume });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumeupdate', this.eventListeners.volumeupdate);
  }

  // stops audio playback when leaving album page and terminate the EventListeners 
  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volumeupdate', this.eventListeners.volumeupdate);
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  // Find index of current song, calculate new index, set song, then play song
  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(currentIndex + 1, this.state.album.songs.length - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ volume: newVolume });
  }

  playPauseHover(index) {
    if (this.state.currentSong.title === this.state.album.songs[index].title && this.state.isPlaying === true){
  return <span className="ion-pause"></span>
   } else {
    if (this.state.isHovered === index) {
  return <span className="ion-play"></span>
} else {
  return <span>{ index + 1 }</span>
  }
 }
  }

  formatTime(seconds) {
   var minutes = 0;
   if (seconds / 60 > 0) {
     minutes = Math.floor(seconds / 60);
     seconds = Math.floor(seconds % 60);
     return minutes + ':' + (seconds > 9 ? seconds : '0' + seconds);
   } else {
     return ("-:--");
   }
  }


  render() {
    return (
     <section className="album">
      <div className="container">
       <div className="row">
        <section id="album-info" className="col-sm-6">
          <div className="container">
           <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
           <div className="player-bar">
            <PlayerBar
             isPlaying={this.state.isPlaying} 
             currentSong={this.state.currentSong}
             formattedTime={this.formatTime(this.audioElement.currentTime)}
             formattedDuration={this.formatTime(this.audioElement.duration)}
             currentTime={this.audioElement.currentTime}
             duration={this.audioElement.duration}
             handleSongClick={() => this.handleSongClick(this.state.currentSong)}
             handlePrevClick={() => this.handlePrevClick()}
             handleNextClick={() => this.handleNextClick()}
             handleTimeChange={(e) => this.handleTimeChange(e)}
             handleVolumeChange={(e) => this.handleVolumeChange(e)}
            />
           </div>
          </div>
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
         </section>
         <table id="song-list" className="col-sm-6">
           <colgroup>
             <col id="song-number-column"  />
             <col id="song-title-column" />
             <col id="song-duration-column" />
           </colgroup>
           <tbody>
             {
               this.state.album.songs.map( (song, index) =>
                 <tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.setState({isHovered: index})} onMouseLeave={() => this.setState({isHovered: false})} >
                   <td>{this.playPauseHover(index)}</td>
                   <td>{song.title}</td>
                   <td>{this.formatTime(song.duration)}</td>
                 </tr>
               )
             }
           </tbody>
         </table>
        </div>
      </div>
     </section>
    ); 
  }
}

export default Album;

