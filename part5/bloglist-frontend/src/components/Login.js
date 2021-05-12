import React, { useState } from 'react'

export const Login = ({ handleLogin }) => {
  const [userName, setUserName] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = (event) => {
    event.preventDefault()


  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>log in </h2>
      <div>
        username
        <input
          id='username'
          type="text"
          value={userName}
          name="Username"
          onChange={({ target }) => setUserName(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )
}
