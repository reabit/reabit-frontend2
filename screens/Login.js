import React, { Component } from 'react'
import {
  Container,
  Content,
  Button,
  Icon,
  Text,
  H1,
  Thumbnail
} from 'native-base'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import { GoogleSignin } from 'react-native-google-signin'
import { connect } from 'react-redux'

import firebase from '../firebase'
import { create_user } from '../redux/actions/usersActions'
import { fetch_articles_from_api } from '../redux/actions/articlesActions'
import { fetch_summaries_from_api } from '../redux/actions/summariesActions'
import { ScreenLoading } from './components'

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
    this.setState({
      isLoading: true
    })

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
        // console.log('facebook account -->', payload)
        this.props.createUser(payload)
        this.props.fetchArticles()
        this.props.fetchSummaries()
        this.setState({
          isLoading: false
        })

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
        // console.log('google account -->', payload)
        this.props.createUser(payload)
        this.props.fetchArticles()
        this.props.fetchSummaries()
        this.setState({
          isLoading: false
        })

        this.props.navigation.navigate('Home')
      })
      .catch((error) => {
        // For details of error codes, see the docs
        alert('Oops.. Login failed! ', error)
      })
  }

  render() {
    let { container, content, image, heading, facebookBtn, googleBtn } = styles
    if (this.state.isLoading) {
      return (<ScreenLoading />)
    } else {
      return (
        <Container style={container}>
          <Content padder contentContainerStyle={content}>
            <Thumbnail large source={require('../img/icons.png')} style={image}/>
            <H1 style={heading}>Reading Habit</H1>
            <Button block style={facebookBtn} onPress={() => this.facebookLogin()}>
              <Icon name='logo-facebook' />
              <Text>Login with Facebook</Text>
            </Button>
            <Button block style={googleBtn} onPress={() => this.googleLogin()}>
              <Icon name='logo-googleplus' />
              <Text>Login with Google</Text>
            </Button>
          </Content>
        </Container>
      )
    }
  }
}

const styles = {
  container: {
    backgroundColor: '#FFFFFF'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image:{
    alignItems: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20
  },
  heading: {
    marginBottom: 60
  },
  facebookBtn: {
    backgroundColor: '#4060B8',
    marginBottom: 20
  },
  googleBtn: {
    backgroundColor: '#EB2E1B'
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