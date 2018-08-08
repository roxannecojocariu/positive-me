import React, { Component } from 'react'
import { browserHistory } from 'react-router'

class HappyQuoteContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      body: '',
      author: ''
    }
  }

  componentDidMount() {
    fetch('https://quotes.rest/quote/search.json?category=happy', {
      headers: { 'X-TheySaidSo-Api-Secret':'4_VSex0_jq_Nu5GN94HewAeF' },
      cache: 'no-store'
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
    .then(response => {
      this.setState({
        body: response.contents.quote,
        author: response.contents.author
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }
  render(){
    return(
      <div>
        {this.state.body}<br />
        {this.state.author}
      </div>
    )
  }
}

export default HappyQuoteContainer
