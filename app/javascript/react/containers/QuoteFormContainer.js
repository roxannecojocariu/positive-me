import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import InputField from '../components/InputField'

class QuoteFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      body: '',
      author: '',
      mood: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClearQuote = this.handleClearQuote.bind(this);
    this.handleQuoteSubmit = this.handleQuoteSubmit.bind(this);
  }

  handleChange(event) {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({ [name]: value })
  }

  handleClearQuote(event){
    event.preventDefault()
    this.setState({
      body: '',
      author: '',
      mood: ''
    })
  }

  handleQuoteSubmit(event) {
    event.preventDefault()
    let formPayload = {
      body: this.state.body,
      author: this.state.author,
      mood: this.state.mood
    }
    this.props.addNewQuote(formPayload)
    this.handleClearQuote(event)
  }

  render(){
    return(
      <form className="callout" onSubmit={this.handleQuoteSubmit}>
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
        <InputField
          content={this.state.mood}
          label="Mood"
          name="mood"
          handleChange={this.handleChange}
        />

        <button onClick={this.handleClearQuote}>Clear</button>
        <input className="button" type="submit" value="Submit" />
      </form>
    )
  }
}

export default QuoteFormContainer
