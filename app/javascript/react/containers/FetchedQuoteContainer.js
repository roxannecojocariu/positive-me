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
      clicked: false
    }
    this.handleOnClick = this.handleOnClick.bind(this)
    this.favoriteQuote = this.favoriteQuote.bind(this)
  }

  handleOnClick(event) {
    let mood;
    if(event.target.innerHTML == "Sad"){
      mood = "happy"
    } else if (event.target.innerHTML == "Unmotivated") {
      mood = "motivational"
    } else if (event.target.innerHTML == 'Uninspired') {
      mood = "inspirational"
    } else {
      mood = this.state.htmlMood
    }
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
        yes: "Favorite it.",
        no: "no",
        clicked: true
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

    favoriteQuote(event) {
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
    .then(response => {
      if(response.json()) {
        alert("Saved successfully!")
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  render(){
    let hiddenDiv;

    if (this.state.clicked) {
      hiddenDiv = <div>
        <div className={this.state.htmlMood}>
          {this.state.body}<br />
          {this.state.author}
        </div>
        <div className="feedback">
          Did you like this quote?
        </div>
        <div className="favorite box" onClick={this.favoriteQuote}>
          {this.state.yes}
        </div>
        <div className="dislike box" onClick={this.handleOnClick}>
          Generate new {this.state.htmlMood} quote.
        </div>
      </div>
    }

    return(
      <div>
        <div className="intro">
          Welcome to the Beginning Steps of a More Positive You! <br />
          How are you feeling today?
        </div>

        <button onClick={this.handleOnClick}>Sad</button>
        <button onClick={this.handleOnClick}>Unmotivated</button>
        <button onClick={this.handleOnClick}>Uninspired</button><br />

        {hiddenDiv}
      </div>
    )
  }
}

export default FetchedQuoteContainer
