import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppState
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import PushNotification from 'react-native-push-notification'
import { Provider } from 'react-redux'

import store from './redux/store'

PushNotification.configure({
    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );

        // process the notification
        
        // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
      * (optional) default: true
      * - Specified if permissions (ios) and token (android and ios) will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
    requestPermissions: true,
});

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
    initialRouteName: 'Login',
})

export default class App extends Component {

  // componentDidMount() {
  //   AppState.addEventListener('change', this.handleAppStateChange);
  // }

  // componentWillUnmount() {
  //   AppState.removeEventListener('change', this.handleAppStateChange);
  // }
  
  // handleAppStateChange(appState) {
  //   if (appState == 'background') {
  //     PushNotification.localNotificationSchedule({
  //       message: "My Notification Message", // (required)
  //       date: new Date(Date.now() + (10 * 1000)) // in 60 secs
  //     });
  //   }
  // }

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}
