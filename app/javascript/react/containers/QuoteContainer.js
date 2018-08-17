import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import QuoteTile from '../components/QuoteTile'

class QuoteContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quotes: [],
      htmlMood: ''
    }
    this.handledonClick = this.handledonClick.bind(this)
  }

  handledonClick(event){
    this.setState({
      htmlMood: event.target.innerHTML,
    })
  }

  componentDidMount() {
    fetch(`/api/v1/quotes`, {
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
          if(response.status == 401){
            alert("You must be signed in to favorite a quote.")
            browserHistory.push('/')
          }
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        quotes: body.quotes
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let quotes;
    if (this.state.quotes.length !== 0){
      quotes = this.state.quotes.map((quote) => {
        if(quote.mood === this.state.htmlMood.toLowerCase()){

          return(
            <QuoteTile
              key={quote.id}
              id={quote.id}
              mood={quote.mood}
              body={quote.body}
              author={quote.author}
              creator_id={quote.creator_id}
            />
          )
        }
      })
    }

    return(
      <div>
      <div className="quotes-title">Click a Category to See Your Saved Quotes:</div>
        <button className="happy-category" onClick={this.handledonClick}>Happy</button>
        <button className="motivational-category" onClick={this.handledonClick}>Motivational</button>
        <button className="inspirational-category" onClick={this.handledonClick}>Inspirational</button>
        <a href={`/quotes/new`}><button className="add-quote-button">Add A Quote</button></a><br />
        {quotes}
      </div>
    )
  }
}
export default QuoteContainer
