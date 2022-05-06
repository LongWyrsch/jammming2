// import logo from './logo.svg';
import React from 'react'
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';

import Spotify from '../../util/Spotify';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlist: [],
    }

    this.search = this.search.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  componentDidMount(){
    window.addEventListener('load', () => Spotify.getAccessToken());
  }


  async search(term){
      let tracks = await Spotify.search(term);
      this.setState({searchResults: tracks})
  }

  removeTrack(trackRemove){
    let newPlaylist = this.state.playlist.filter(track => {
      return track.id !== trackRemove.id
    });
    this.setState({playlist: newPlaylist});
  }

  addTrack(newTrack){
    let newPlaylist = this.state.playlist //.push(track);
    if (newPlaylist.some(track=>track.id === newTrack.id) === false){
      newPlaylist.push(newTrack)
    }

    let newSearchResults = this.state.searchResults.filter(track => {
      return track.id !== newTrack.id
    });

    this.setState({
      playlist: newPlaylist,
      searchResults: newSearchResults
    });

  }

  updatePlaylistName(newPlaylistName){
    this.setState({playlistName: newPlaylistName})
  }

  savePlaylist(name){
    Spotify.createPlaylist(name, this.state.playlist)
    this.setState({
      playlist: []
    })
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar search={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}  addTrack={this.addTrack}/>
            <Playlist removeTrack={this.removeTrack} playlist={this.state.playlist} updatePlaylistName={this.updatePlaylistName} savePlaylist={this.savePlaylist}/>
          </div>
        </div>
      
      </div>
    )
  }

}

export default App;
