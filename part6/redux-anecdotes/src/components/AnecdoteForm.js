import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const add = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(anecdote))
        dispatch(setNotification(`you created '${anecdote}'`, 2000))

      }

    return (
        <>
        <h2>create new</h2>
        <form onSubmit={add}>
            <div><input name="anecdote"/></div>
            <button type="submit">create</button>
        </form>
        </>
    )
}

export default AnecdoteForm