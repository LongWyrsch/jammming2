import React from 'react';
import './SearchBar.css'

class SearchBar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          term: ''
        }
    
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this); 
    }

    handleOnChange(event){
        this.setState({
          term: event.target.value
        })
    }

    handleOnClick(){
        this.props.search(this.state.term);
    }

    render(){
        return(
            <div className="SearchBar">
            <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleOnChange}/>
            <button className="SearchButton" onClick={this.handleOnClick}>SEARCH</button>
            </div>
        )
    }
}

export default SearchBar;