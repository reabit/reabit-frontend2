import axios from 'axios'
import firebase from '../../firebase'

const add_summaries_from_api = (summaries) => {
  return {
    type: 'ADD_SUMMARIES_FROM_API',
    payload: summaries
  }
}

export const fetch_summaries_from_api = () => {
  return (dispatch, getState) => {
    const urlAPI = 'http://apibucket.sabikaorganizer.com:3008/summarys/list'
    const userEmail = firebase.auth().currentUser
    const config = {
      headers: {
        email: userEmail.email
      }
    }
    axios.get(urlAPI, config)
    .then(({ data: { data } }) => {
      dispatch(add_summaries_from_api(data))
    })
  }
}

export const add_summary_from_api = (idArticle, summaryUser) => {
  return (dispatch, getState) => {
    const urlAPI = `http://apibucket.sabikaorganizer.com:3008/summarys/add/${idArticle}`
    const userEmail = firebase.auth().currentUser
    const config = {
      headers: {
        email: userEmail.email
      }
    }
    axios.post(urlAPI, {summary: summaryUser}, config)
    .then(({ data: { data } }) => {
      console.log(data, 'from action summary')
      dispatch(add_summary(data))
    })
  }
}

export const add_summary = (summary) => {
  return {
    type: 'ADD_SUMMARY',
    payload: summary
  }
}