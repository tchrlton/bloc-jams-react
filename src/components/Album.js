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
      isPlaying: false,
      isHovered: false
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
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

  render() {
    return (
     <section className="album">
       <section id="album-info">
         <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
         <div className="album-details">
           <h1 id="album-title">{this.state.album.title}</h1>
           <h2 className="artist">{this.state.album.artist}</h2>
           <div id="release-info">{this.state.album.releaseInfo}</div>
         </div>
        </section>
        <table id="song-list">
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
                  <td>{song.duration}</td>
                </tr>
              )
            }
          </tbody>
        </table>
        <PlayerBar 
          isPlaying={this.state.isPlaying} 
          isCurrentSong={this.state.currentSong} 
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
        />
     </section>
    ); 
  }
}

export default Album;

