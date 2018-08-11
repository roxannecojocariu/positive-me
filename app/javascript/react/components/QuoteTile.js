import React from 'react';
import { browserHistory, Link } from 'react-router';

const QuoteTile = (props) => {
  return(
    <div className="quote-tile">
      {props.mood}
      {props.body}
      {props.author}
    </div>
  )
}

export default QuoteTile;
