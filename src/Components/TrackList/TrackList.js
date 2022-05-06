import React from 'react';
import './TrackList.css'
import Track from '../Track/Track';

class TrackList extends React.Component{


    render(){
        return(
            <div className="TrackList">
                {this.props.trackList && this.props.trackList.map(track => {
                    return <Track track={track} isRemoval={this.props.isRemoval} key={track.id} removeTrack={this.props.removeTrack} addTrack = {this.props.addTrack}/>
                })}
            </div>
        )
    }
}

export default TrackList;