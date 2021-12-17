import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)

  

  switch(action.type) {
      case 'VOTE':
        const id = action.data.id;
        let obj = state.find(x => x.id === id)
        obj.votes++;
        return state.map(x => x.id !== id ? x : obj);
      case 'NEW':
        return [...state, action.data]
      case 'INIT_AN':
        return action.data
      default:
         return state
  }

}

export const voteAction = (anecdote) => {
  const newObj = {...anecdote }
  newObj.votes++;

  return async dispatch => {
    const updateObj = await anecdoteService.update(newObj.id, newObj)

    return dispatch({
      type: 'VOTE',
      data : { id: updateObj.id }
    })
    
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)

    dispatch({
      type: 'NEW',
      data: newAnecdote
    })
  }
 
}

export const iniciate = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_AN',
      data: anecdotes
    })
  }
  }

  
 

export default reducer