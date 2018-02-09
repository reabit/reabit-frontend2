import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Button
} from 'react-native'

class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, styles.facebook]}
          onPress={() =>
            navigate('Chat')}
        >
          <Text style={styles.textColor}>Login with Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.google]}
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