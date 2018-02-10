import axios from 'axios'
import firebase from '../../firebase'

const add_article_from_api = (articles) => {
  return {
    type: 'ADD_ARTICLE_FROM_API',
    payload: articles
  }
}

export const fetch_article_from_api = () => {
  return (dispatch, getState) => {
    const urlAPI = 'http://apibucket.sabikaorganizer.com:3008/readings/list/1'
    axios.get(urlAPI)
    .then(({ data: { data } }) => {
      dispatch(add_article_from_api(data))
    })
  }
}