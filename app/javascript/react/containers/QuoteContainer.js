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

  // componentDidMount() {
  //   const mood = 'happy'
  //   fetch(`/api/v1/quotes?category=${mood}`)
  //   .then(response => {
  //     if(response.ok) {
  //       return response;
  //     } else {
  //       let errorMessage = `${response.status} (${response.statusText})`,
  //       error = new Error(errorMessage);
  //       throw(error);
  //     }
  //   })
  //   .then(response => response.json())
  //   .then(response => {
  //     this.setState({
  //       body: response.contents.quote,
  //       author: response.contents.author
  //     })
  //   })
  //   .catch(error => console.error(`Error in fetch: ${error.message}`));
  // }
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

//when asked if liked? handle click function for yes or no. if not, generate new quote.  if yes, favorite it and add to table
//net http, def index and put it all in there then come here and add the api v1 end point and that's where i'll be fetching from


// DON'T FORGET TO TELL THEM YOU ACCIDENTALLY UPLOADED THE SECRET
