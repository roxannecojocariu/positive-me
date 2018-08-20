import React from 'react';
import { browserHistory, Link } from 'react-router';

const QuoteTile = (props) => {
  let editButton;

  if (props.creator_id !== null) {
    editButton = <a className="edit-quote-button" href={`/quotes/${props.id}/edit`}>Edit Quote</a>
  } else {
    editButton = null
  }

  return(
    <div className= "user-quote-moods row">
      {props.body}<br/>
      {props.author}
      <div className="edit-quote-button">
        {editButton}
      </div>
    </div>
  )
}

export default QuoteTile;
