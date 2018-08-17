import React from 'react'

const MoodDropdown = props => {
  return(
    <label onChange={props.handleChange}>{props.label}
      <select
        name={props.name}
        value={props.content}
      >
        <option></option>
        <option value="happy">Happy</option>
        <option value="motivational">Motivational</option>
        <option value="inspirational">Inspirational</option>
      </select>
    </label>
  )
}

export default MoodDropdown
