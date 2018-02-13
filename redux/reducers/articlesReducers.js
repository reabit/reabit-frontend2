const initialState = {
  articles: [],
  categories: []
}

const articlesReducers = (state = initialState, action) => {
  switch (action.type) {
    case `SET_CATEGORIES_ARTICLE`:
      console.log(action.payload, 'from reducer')
      return { ...state, categories: action.payload}

    case 'ADD_ARTICLES_FROM_API':
      return { ...state, articles: action.payload }

    case 'REMOVE_ARTICLE':
      let newArticlesAfterRemoved = state.articles.filter(a =>{
        return a._id !== action.payload.article._id
      })
      let newCategoriesAfterRemoved = state.categories
      return { ...state, articles: newArticlesAfterRemoved, categories: newCategoriesAfterRemoved}

    case 'ADD_ARTICLE':
      let newArticles = state.articles.concat(action.payload.article)
      let newCategories = state.categories.map(cat =>{
        if(cat.url == action.payload.category.url){
          return action.payload.category
        }else{
          return cat
        }
      })
      return { ...state, articles: newArticles, categories: newCategories}
      
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