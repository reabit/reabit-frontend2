import React, { Component } from 'react'
import {
  Container,
  Content,
  Button,
  Icon,
  Text
} from 'native-base'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import { GoogleSignin } from 'react-native-google-signin'
import { connect } from 'react-redux'

import firebase from '../firebase'
import { create_user } from '../redux/actions/usersActions'
import { fetch_articles_from_api } from '../redux/actions/articlesActions'
import { fetch_summaries_from_api } from '../redux/actions/summariesActions'
import { Loading } from './components'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }

  static navigationOptions = {
    header: null
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
        } else {
          // Retrieve the access token
          return AccessToken.getCurrentAccessToken()
        }
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
        this.props.createUser(payload)
        this.props.navigation.navigate('Home')
      })
      .catch((error) => {
        // For details of error codes, see the docs
        alert('Oops.. Login failed! ', error)
      })
    }

  googleLogin () {
    this.setState({
      isLoading: true
    })
    console.log('2', this.state.isLoading)
    console.log(GoogleSignin)
    GoogleSignin.signIn()
    .then((data) => {
      console.log('asad')
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
      this.props.createUser(payload)
      this.props.fetchArticles()
      this.props.fetchSummaries()
      this.setState({
        isLoading: false
      })
      console.log('3', this.state.isLoading)
      this.props.navigation.navigate('Home')
    })
    .catch((error) => {
      // For details of error codes, see the docs
      alert('Oops.. Login failed! ', error)
    })
  }

  render() {
    if (this.state.isLoading) {
      console.log('1', this.state.isLoading)
      return (<Loading />)
    } else {
      console.log('false', this.state.isLoading)
      return (
        <Container>
          <Content padder 
            contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
          >
            <Button block 
              style={{ backgroundColor: '#4060B8', marginBottom: 20 }}
              onPress={() => this.facebookLogin()}
            >
              <Icon name='logo-facebook' />
              <Text>Login with Facebook</Text>
            </Button>
            <Button block 
              style={{ backgroundColor: '#EB2E1B' }}
              onPress={() => this.googleLogin()}
            >
              <Icon name='logo-googleplus' />
              <Text>Login with Google</Text>
            </Button>
          </Content>
        </Container>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (payload) => dispatch(create_user(payload)),
    fetchArticles: () => dispatch(fetch_articles_from_api()),
    fetchSummaries: () => dispatch(fetch_summaries_from_api())
  }
}

export default connect(null, mapDispatchToProps)(Login)