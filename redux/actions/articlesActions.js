import axios from 'axios'
import firebase from '../../firebase'

const add_articles_from_api = (articles) => {
  return {
    type: 'ADD_ARTICLES_FROM_API',
    payload: articles
  }
}

export const fetch_articles_from_api = () => {
  return (dispatch, getState) => {
    const urlAPI = 'http://apibucket.sabikaorganizer.com:3008/readings/list'
    const userEmail = firebase.auth().currentUser
    const config = {
      headers: {
        email: userEmail.email
      }
    }
    axios.get(urlAPI, config)
    .then(({ data: { data } }) => {
      dispatch(add_articles_from_api(data))
    })
  }
}