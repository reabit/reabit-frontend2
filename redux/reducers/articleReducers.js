const initialState = {
  articles: []
}

const articleReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ARTICLE_FROM_API':
      return { ...state, articles: action.payload }
    default:
      return state
  }
}

export default articleReducers