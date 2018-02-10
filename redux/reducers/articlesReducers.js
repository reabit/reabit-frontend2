const initialState = {
  articles: []
}

const articlesReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ARTICLES_FROM_API':
      return { ...state, articles: action.payload }
    default:
      return state
  }
}

export default articlesReducers