import React from 'react'

const CreateForm = ({ handleSubmit, title, author, url, handleUrlChange, handleTitleChange, handleAuthorChange }) => {

  return (
    <form onSubmit={handleSubmit}>

      <h2>Create New</h2>
      <div>
        title:
        <input id='title'
          type="text"
          value={title}
          name="Title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author:
        <input id='author'
          type="text"
          value={author}
          name="Author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url:
        <input id='url'
          type="text"
          value={url}
          name="URL"
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">Add</button>
      <br />
    </form>
  )
}

export default CreateForm
