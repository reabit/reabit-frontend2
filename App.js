import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import PushNotification from 'react-native-push-notification'

import store from './redux/store'

import {
  Login,
  Home,
  Chat,
  ReadingList,
  ArticleDetail,
  ReadingHistory
} from './screens'

const AppNavigator = StackNavigator({
  Login: { screen: Login },
  Home: { screen: Home },
  Chat: { screen: Chat },
  ReadingList: { screen: ReadingList },
  ArticleDetail: { screen: ArticleDetail },
  ReadingHistory: { screen: ReadingHistory }
}, {
    initialRouteName: 'Login',
})

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}
