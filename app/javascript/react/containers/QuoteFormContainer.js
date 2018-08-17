import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import InputField from '../components/InputField'
import BodyTile from '../components/BodyTile'
import MoodDropdown from '../components/MoodDropdown'

class QuoteFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      body: '',
      author: '',
      mood: '',
      quotes: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClearQuote = this.handleClearQuote.bind(this);
    this.handleQuoteSubmit = this.handleQuoteSubmit.bind(this);
    this.addNewQuote = this.addNewQuote.bind(this)
  }

  handleChange(event) {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({ [name]: value })
  }

  handleClearQuote(event){
    event.preventDefault();
    this.setState({
      body: '',
      author: '',
      mood: ''
    })
  }

  handleQuoteSubmit(event) {
    event.preventDefault();
    let formPayload = {
      new_quote: true,
      quote: {
        body: this.state.body,
        author: `- ${this.state.author}`,
        mood: this.state.mood
      }
    }
    this.addNewQuote(formPayload)
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
          else if(response.status == 401){
            alert("You must be signed in to add a quote.")
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
    let addNewQuote = (formPayload) => this.addNewQuote(formPayload)

    return(
      <div>
        <div className="quote-form-title">
          Submit Your Own Quote to Positive Me!
        </div>

        <form className="quote-form" onSubmit={this.handleQuoteSubmit}>
          <BodyTile
            content={this.state.body}
            label="Body"
            name="body"
            handleChange={this.handleChange}
          />
          <InputField
            content={this.state.author}
            label="Author"
            name="author"
            handleChange={this.handleChange}
          />
          <MoodDropdown
            content={this.state.mood}
            label="Mood"
            name="mood"
            handleChange={this.handleChange}
          />

          <button className="submit-button" type="submit" value="Submit">Submit</button>
          <button onClick={this.handleClearQuote}>Clear</button>
        </form>
      </div>
    )
  }
}

export default QuoteFormContainer
