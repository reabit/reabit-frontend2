import axios from 'axios'
import firebase from '../../firebase'

const urlAPI = 'http://apibucket.sabikaorganizer.com:3008/chatbot'

export const fetch_chatbot_from_api = (text) => {
  return (dispatch, getState)  => {
    const config = {
      chat: text,
      headers: {
        email: firebase.auth().currentUser.email
      }
    }
    axios.post(urlAPI, config)
    .then(({ data: { data } }) => {
      dispatch(show_chat(data))
    })
  }
}
const show_chat = (messages) => {
  return {
    type: 'ADD_CHAT',
    payload:messages
  }
}