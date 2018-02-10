import React, { Component } from 'react'

import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { StackNavigator } from 'react-navigation'

import {
  Login,
  Home,
  Chat,
  DetailArticle,
  ArticleList,
  ReadingList,
  HistoryReadings,
  Menu
} from './screens'

const AppNavigator = StackNavigator({
  Login: { screen: Login },
  Home: { screen: Home },
  Chat: { screen: Chat },
  ArticleList: { screen: ArticleList },
  ReadingList: { screen: ReadingList },
  DetailArticle: { screen: DetailArticle },
  HistoryReadings: { screen: HistoryReadings },
  Menu: { screen: Menu }
}, {
    initialRouteName: 'Home',
})

export default class App extends Component {
  render() {
    return (
      <AppNavigator />
    )
  }
}
