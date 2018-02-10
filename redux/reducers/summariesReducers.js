const initialState = {
  summaries: []
}

const summariesReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SUMMARIES_FROM_API':
      return { ...state, summaries: action.payload }
    default:
      return state
  }
}

export default summariesReducers