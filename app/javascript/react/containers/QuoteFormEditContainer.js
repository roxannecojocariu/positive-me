import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import InputField from '../components/InputField'
import MoodDropdown from '../components/MoodDropdown'

class QuoteFormEditContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      body: '',
      author: '',
      mood: '',
      creator_id: '',
      quote_id: this.props.params.id,
      updatedQuote: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClearQuote = this.handleClearQuote.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleChange(event) {
    let newState = this.state
    newState[event.target.name] = event.target.value
    this.setState(newState)
  }

  handleClearQuote(event){
    event.preventDefault()
    let newState = this.state
    newState.body = ''
    newState.author = ''
    newState.mood = ''
    this.setState({ newState })
  }

  handleUpdate(event) {
    event.preventDefault()
    let formPayload = this.state
    fetch(`/api/v1/quotes/${this.state.quote_id}`,
    {
      method: "PATCH",
      body: JSON.stringify(formPayload),
      credentials: 'same-origin',
      headers: { "Content-Type": 'application/json' }
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
    .then(response => response.json())
    .then(response => {
      if(response) {
        this.setState({
          updatedQuote: {body: this.state.body, author: `- ${this.state.author}`, mood: this.state.mood
          }
        })
        alert("Saved successfully!")
        browserHistory.push('/quotes')
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

componentDidMount() {
  fetch(`/api/v1/quotes/${this.state.quote_id}`, {
    credentials: 'same-origin',
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
        author: body.quote.author,
        body: body.quote.body,
        mood: body.quote.mood,
        creator_id: body.quote.creator_id
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  render(){

    return(
      <form className="quote-form" onSubmit={this.handleUpdate}>
        <InputField
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
    )
  }
}

export default QuoteFormEditContainer
