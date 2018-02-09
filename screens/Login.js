import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Button
} from 'react-native'
// import { LoginButton } from 'react-native-fbsdk'
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk'
import firebase from 'firebase'

class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  }

  onLoginOrRegister = () => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
    .then((result) => {
      if (result.isCancelled) {
        return Promise.reject(new Error('The user cancelled the request'))
      }
      // Retrieve the access token
      return AccessToken.getCurrentAccessToken()
    })
    .then((data) => {
      // Create a new Firebase credential with the token
      firebase.initializeApp({
        apiKey: 'AIzaSyB9pZ7AjNMf8eYUOVR6YSJ6NfNBYEIDv_4',
        authDomain: 'reabit-chatbot.firebaseapp.com',
        databaseURL: 'https://reabit-chatbot.firebaseio.com',
        projectId: 'reabit-chatbot',
        storageBucket: 'reabit-chatbot.appspot.com',
        messagingSenderId: '1024910241700'
      })
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
      // Login with the credential
      return firebase.auth().signInWithCredential(credential)
    })
    .then((user) => {
      // If you need to do anything with the user, do it here
      // The user will be logged in automatically by the
      // `onAuthStateChanged` listener we set up in App.js earlier
      console.log('user -->', {
        user: {
          name: user.displayName,
          email: user.email
        }
      })
      this.props.navigation('Home')
    })
    .catch((error) => {
      const { code, message } = error
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
    })
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, styles.facebook]}

          onPress={() => this.onLoginOrRegister()}
        >
          <Text style={styles.textColor}>Login with Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.google]}
          onPress={() => navigate('Chat')}
        >
          <Text>Login with Google</Text>
        </TouchableOpacity>
      </View>
      // <View style={styles.container}>
      //   <LoginButton
      //     publishPermissions={['publish_actions']}
      //     onLoginFinished={
      //       (error, result) => {
      //         if (error) {
      //           alert('Login failed with error: ' + result.error)
      //         } else if (result.isCancelled) {
      //           alert('Login was cancelled')
      //         } else {
      //           alert('Login was successful with permissions: ' + result.grantedPermissions)
      //           console.log('result -->', result)
      //         }
      //       }
      //     }
      //     onLogoutFinished={() => alert('User logged out')}/>
      // </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 20,
    width: 300
  },
  facebook: {
    backgroundColor: '#4060B8'
  },
  google: {
    backgroundColor: '#FFFFFF'
  },
  textColor: {
    color: '#FFFFFF'
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  countText: {
    color: '#FF00FF'
  }
})

export default Login