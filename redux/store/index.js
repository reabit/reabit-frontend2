import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { articleReducers } from '../reducers'

const reducers = combineReducers({
  articleReducers
  // summaryReducers
})
const middleware = applyMiddleware(thunk)
const store = createStore(reducers, middleware)

export default store