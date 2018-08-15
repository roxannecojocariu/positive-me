import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import QuoteTile from '../components/QuoteTile'
import QuoteFormContainer from './QuoteFormContainer'

class QuoteContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quotes: [],
      htmlMood: '',
      clicked: 'false'
    }
    this.handledonClick = this.handledonClick.bind(this)
    this.addNewQuote = this.addNewQuote.bind(this)
    this.addQuote = this.addQuote.bind(this)
  }

  addQuote(event){
    this.setState({ clicked: 'true' })
  }

  handledonClick(event){
    this.setState({ htmlMood: event.target.innerHTML })
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

  addNewQuote(formPayload) {
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
        if(response.status == 422){
          alert("You must include a body and a mood.")
        }
      throw(error);
    }
  })
  .then(responseData => {
    if(responseData.json()) {
      this.setState({ quotes: [...this.state.quotes, responseData]})
      alert("Saved successfully!")
      browserHistory.push('/quotes')
    }
  })
  .catch(error => console.error(`Error in fetch: ${error.message}`))
}

  render(){
    // let hiddenDiv;
    // if(this.state.clicked) {
    //   hiddenDiv = <div>
    //   <QuoteFormContainer
    //     addNewQuote={addNewQuote}
    //   />
    //   </div>
    // }

    let addNewQuote = (formPayload) => this.addNewQuote(formPayload)

    let quotes;
    if(this.state.quotes.length != 0){
      quotes = this.state.quotes.map((quote) => {
        if(quote.mood == this.state.htmlMood.toLowerCase()){
          return(
            <QuoteTile
              key={quote.id}
              mood={quote.mood}
              body={quote.body}
              author={quote.author}
            />
          )
        }
      })
    }

    return(
      <div>
      <div className="quotes-title">Click a Category to See Your Saved Quotes:</div>
      <button onClick={this.handledonClick}>Happy</button>
      <button onClick={this.handledonClick}>Motivational</button>
      <button onClick={this.handledonClick}>Inspirational</button><br />
      <button onClick={this.addQuote}>Add Your Own Quote</button><br />
      {quotes}
      </div>
    )
  }
}
export default QuoteContainer
