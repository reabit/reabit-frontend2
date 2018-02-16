import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyB9pZ7AjNMf8eYUOVR6YSJ6NfNBYEIDv_4',
  authDomain: 'reabit-chatbot.firebaseapp.com',
  databaseURL: 'https://reabit-chatbot.firebaseio.com',
  projectId: 'reabit-chatbot',
  storageBucket: 'reabit-chatbot.appspot.com',
  messagingSenderId: '1024910241700'
}

firebase.initializeApp(config)
export default firebase