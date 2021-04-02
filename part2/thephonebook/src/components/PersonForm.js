import React from 'react'

const PersonForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
        <div>
          name: <input onChange={props.handleChange} value={props.newName} name="name" />
        </div>
        <div>
          number:{" "}
          <input onChange={props.handleChange} value={props.newNumber} name="number" />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm;