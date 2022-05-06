import React from 'react';
import './Track.css'

class Track extends React.Component{

    constructor(props){
        super(props);
        this.renderAction = this.renderAction.bind(this);
        this.handleAddTrack = this.handleAddTrack.bind(this);
        this.handleRemoveTrack = this.handleRemoveTrack.bind(this);
    }

    handleRemoveTrack(){
        this.props.removeTrack(this.props.track)
    }

    handleAddTrack(){
        this.props.addTrack(this.props.track)
    }

    renderAction(){
        if (this.props.isRemoval===true){
            return <button className="Track-action" onClick={this.handleRemoveTrack}>-</button>
        }else{
            return <button className="Track-action" onClick={this.handleAddTrack}>+</button>
        }
    }

    render(){
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderAction()}
            </div>
        )
    }
}

export default Track;