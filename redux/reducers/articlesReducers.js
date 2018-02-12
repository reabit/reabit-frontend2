const initialState = {
  articles: []
}

const articlesReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ARTICLES_FROM_API':
      return { ...state, articles: action.payload }
    case 'SET_READING_STATUS':
      action.payload.statusRead = true
      const updateArticles = state.articles.map(article => {
        if (article._id === action.payload._id) {
          return {...article, ...action.payload}
        }
        return article
      })
      return { ...state, articles: updateArticles }
    default:
      return state
  }
}

export default articlesReducers