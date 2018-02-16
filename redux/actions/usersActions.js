import axios from 'axios'

export const create_user = (payload) => {
  return (dispatch, getState) => {
    const urlAPI = 'http://apibucket.sabikaorganizer.com:3008/users/login'
    axios.post(urlAPI, payload)
    .then(({ data }) => {
      console.log('Login success', data)
    })
  }
}