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
    axios.get(urlAPI)
    .then(({ data: { data } }) => {
      dispatch(add_summaries_from_api(data))
    })
  }
}