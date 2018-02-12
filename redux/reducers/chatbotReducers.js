const initialState = {
  messages: []
}

const chatbotReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CHAT':
      let newMessages = state.messages.concat(action.payload.messages)
      return { ...state, messages: newMessages}      
  
    default:
      return state
  }
}

export default chatbotReducers