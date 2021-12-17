import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer, { iniciate } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdotesService from './services/anecdotes'

const reducerr = combineReducers({
    anectodes: reducer,
    notification: notificationReducer,
    filter: filterReducer
})

const store = createStore(reducerr, composeWithDevTools(
    applyMiddleware(thunk)
))

export default store