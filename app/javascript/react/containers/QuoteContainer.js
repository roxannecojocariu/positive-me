import React, { Component } from 'react'
import { browserHistory } from 'react-router'

class QuoteContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      body: '',
      author: ''
    }
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnClick(event) {
    let mood = event.target.innerHTML

    fetch(`/api/v1/quotes?category=${mood}`)
    .then(response => {
      if(response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(response => {
      this.setState({
        body: response.contents.quote,
        author: response.contents.author
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

  render(){
    return(
      <div>
        <button onClick={this.handleOnClick}>Sad</button>
        <button onClick={this.handleOnClick}>Motivation</button>
        <button onClick={this.handleOnClick}>Inspiration</button>

      {this.state.body}<br />
      {this.state.author}
      </div>
    )
  }
}

export default QuoteContainer
