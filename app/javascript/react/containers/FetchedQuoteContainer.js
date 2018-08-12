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
      errors: [],
      successStatus: '',
    }
    this.handleOnClick = this.handleOnClick.bind(this)
    this.favoriteQuote = this.favoriteQuote.bind(this)
  }

  handleOnClick(event) {
    let mood = event.target.innerHTML
    fetch(`/api/v1/fetched_quotes?category=${mood}`)
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
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      debugger
      if (body.errors) {
      this.setState({
        errors: body.error,
        successStatus: body.successStatus
      })
    }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  render(){
    return(
      <div>
        <button onClick={this.handleOnClick}>Sad</button>
        <button onClick={this.handleOnClick}>Motivation</button>
        <button onClick={this.handleOnClick}>Inspiration</button><br />

        <div className={this.state.htmlMood}>
          {this.state.body}<br />
          {this.state.author}
        </div>
        <div className="favorite">
        <button onClick={this.favoriteQuote}>
        yes</button>
        </div>
        <div className="dislike">
        {this.state.errors}
        {this.state.successStatus}
          {this.state.no}
        </div>
      </div>
    )
  }
}

export default FetchedQuoteContainer
