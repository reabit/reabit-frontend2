import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Button
} from 'react-native'
import firebase from '../firebase'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'

class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  }

  componentWillMount () {
    GoogleSignin.hasPlayServices({ autoResolve: true })
    GoogleSignin.configure({
      webClientId: '1024910241700-1frri4s2be2m8lbasur92pgbfb3oj1s9.apps.googleusercontent.com'
    })
  }
    
  facebookLogin () {
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      .then((result) => {
        if (result.isCancelled) {
          return Promise.reject(new Error('The user cancelled the request'))
        }
        // Retrieve the access token
        return AccessToken.getCurrentAccessToken()
      })
      .then((data) => {
        // Login with the credential
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
        return firebase.auth().signInWithCredential(credential)
      })
      .then((user) => {
        // If you need to do anything with the user, do it here
        let payload = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        }
        console.log('facebook account -->', payload)
        this.props.navigation.navigate('Home')
      })
      .catch((error) => {
        // For details of error codes, see the docs
        alert('Oops.. Login failed! ', error)
      })
    }
    
    googleLogin () {
      GoogleSignin.signIn()
      .then((data) => {
        // Login with the credential
        let credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
        return firebase.auth().signInWithCredential(credential)
      })
      .then((user) => {
        // If you need to do anything with the user, do it here
        const payload = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        }
        console.log('google account -->', payload)
        this.props.navigation.navigate('Home')
      })
      .catch((error) => {
        // For details of error codes, see the docs
        alert('Oops.. Login failed! ', error)
      })
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, styles.facebook]}
          onPress={() => this.facebookLogin()}
        >
          <Text style={styles.textColor}>Login with Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.google]}
          onPress={() => this.googleLogin()}
        >
          <Text>Login with Google</Text>
        </TouchableOpacity>
      </View>
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