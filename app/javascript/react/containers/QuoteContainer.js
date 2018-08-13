import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import QuoteTile from '../components/QuoteTile'

class QuoteContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quotes: []
    }
  }

  componentDidMount() {
    fetch(`/api/v1/quotes`)
    .then(response => {
      if (response.ok) {
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
        quotes: response.quotes
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let quotes;

    if(this.state.quotes.length != 0){
      quotes = this.state.quotes.map((quote) => {
        return(
          <QuoteTile
            key={quote.id}
            mood={quote.mood}
            body={quote.body}
            author={quote.author}
          />
        )
      })
    }

    return(
      <div>
      {quotes}
      </div>

    )
  }
}
export default QuoteContainer
