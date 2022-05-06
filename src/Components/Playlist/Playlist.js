import React from 'react';
import TrackList from '../TrackList/TrackList'
import './Playlist.css'

class Playlist extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            playlistName: 'New playlist'
        }
        this.changePlaylistName = this.changePlaylistName.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    changePlaylistName(event){
        this.setState({playlistName: event.target.value})
    }

    handleSave(){
        this.props.savePlaylist(this.state.playlistName);
        this.setState({playlistName: 'New playlist'});
    }

    render(){
        return(
            <div className="Playlist">
                <input value={this.state.playlistName} onChange={this.changePlaylistName}/>
                <TrackList isRemoval={true} trackList={this.props.playlist} removeTrack={this.props.removeTrack}/>
                <button className="Playlist-save" onClick={this.handleSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}

export default Playlist;