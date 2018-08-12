import React, { Component } from 'react'
import { browserHistory } from 'react-router'

class FetchedQuoteContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      body: '',
      author: '',
      htmlMood: '',
      yes: '',
      no: '',
    }
    this.handleOnClick = this.handleOnClick.bind(this)
    this.favoriteQuote = this.favoriteQuote.bind(this)
  }

  handleOnClick(event) {
    let mood = event.target.innerHTML
    fetch(`/api/v1/fetched_quotes?category=${mood}`,{
      credentials: 'same-origin'
    })
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
    .then(body => {
      this.setState({
        body: body.contents.quote,
        author: `- ${body.contents.author}`,
        htmlMood: mood,
        yes: "yes",
        no: "no"
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

    favoriteQuote(event) {
      debugger
      let formPayload = {
        body: this.state.body,
        author: this.state.author,
        mood: this.state.htmlMood,
      }
      fetch(`/api/v1/quotes.json`,
      {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(formPayload),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => {
      if(response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
          if(response.status == 401){
            alert("You must be signed in to favorite a quote.")
          }
        throw(error);
      }
    })
    .then(response => response.json())
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  render(){
    return(
      <div>
        <button onClick={this.handleOnClick}>Sad</button>
        <button onClick={this.handleOnClick}>Motivation</button>
        <button onClick={this.handleOnClick}>Inspiration</button><br />
        {this.state.catchError}
        <div className={this.state.htmlMood}>
          {this.state.body}<br />
          {this.state.author}
        </div>
        <div className="favorite"onClick={this.favoriteQuote}>
          {this.state.yes}
        </div>
        <div className="dislike">
          {this.state.no}
        </div>
      </div>
    )
  }
}

export default FetchedQuoteContainer
