import React from 'react';
import { browserHistory, Link } from 'react-router';

const QuoteTile = (props) => {
  return(
    <div className= "user-quote-moods row">
      {props.body}
      {props.author}
    </div>
  )
}

export default QuoteTile;
