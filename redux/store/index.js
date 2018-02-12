import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { articlesReducers, summariesReducers, chatbotReducers } from '../reducers'

const reducers = combineReducers({
  articlesReducers,
  summariesReducers,
  chatbotReducers
})
const middleware = applyMiddleware(thunk)
const store = createStore(reducers, middleware)

export default store