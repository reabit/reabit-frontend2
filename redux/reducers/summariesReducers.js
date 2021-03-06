const initialState = {
  summaries: [],
  statusSummaries: false
}

const summariesReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SUMMARIES_FROM_API':
      return { ...state, summaries: action.payload, statusSummaries: true }
    case 'ADD_SUMMARY':
      let newSummary = state.summaries.concat(action.payload)
      console.log(action.payload, 'dari reducer')
      return { ...state, summaries: newSummary}
    default:
      return state
  }
}

export default summariesReducers