import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAction } from '../reducers/anecdoteReducer';
import { showLikeNotification, hideNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter === '' || state.filter === 'ALL') return state.anectodes.sort((a, b) => b.votes - a.votes)
        return state.anectodes.filter(x => x.content.includes(state.filter)).sort((a, b) => b.votes - a.votes)
    })
    
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        let id = anecdote.id
        dispatch(setNotification(`you voted '${anecdote.content}'`, 2000))
        
    }

    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
                </div>
            )}    
        </>
    )
}

export default AnecdoteList