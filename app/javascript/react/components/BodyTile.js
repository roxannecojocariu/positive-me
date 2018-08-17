import React from 'react'

const BodyTile = props => {
  return(
    <label onChange={props.handleChange}>{props.label}
      <textarea
        name={props.name}
        value={props.content}
      />
    </label>
  )
}

export default BodyTile
