import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { articlesReducers, summariesReducers } from '../reducers'

const reducers = combineReducers({
  articlesReducers,
  summariesReducers
})
const middleware = applyMiddleware(thunk)
const store = createStore(reducers, middleware)

export default store