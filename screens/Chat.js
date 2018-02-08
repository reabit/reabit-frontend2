import React, { Component } from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, ToastAndroid, View } from 'react-native'
import { Icon } from 'native-base'
import { GiftedChat, Actions, Bubble, SystemMessage } from 'react-native-gifted-chat'
import SpeechAndroid from 'react-native-android-voice'

import CustomActions from './data/CustomActions'
import CustomView from './data/CustomView'

class Chat extends Component {
  static navigationOptions = {
    title: 'Chat',
  }

  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
    }

    this._isMounted = false
    this.onSend = this.onSend.bind(this)
    this.onReceive = this.onReceive.bind(this)
    this.renderCustomActions = this.renderCustomActions.bind(this)
    this.renderBubble = this.renderBubble.bind(this)
    this.renderSystemMessage = this.renderSystemMessage.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.onLoadEarlier = this.onLoadEarlier.bind(this)
    this._buttonClick = this._buttonClick.bind(this)

    this._isAlright = null
  }

  componentWillMount() {
    this._isMounted = true
    this.setState(() => {
      return {
        messages: require('./data/messages.js')
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      }
    })

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(previousState.messages, require('./data/old_messages.js')),
            loadEarlier: false,
            isLoadingEarlier: false,
          }
        })
      }
    }, 1000) // simulating network
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      }
    })

    // for demo purpose
    this.answerDemo(messages)
  }

  answerDemo(messages) {
    if (messages.length > 0) {
      if ((messages[0].image || messages[0].location) || !this._isAlright) {
        this.setState((previousState) => {
          return {
            typingText: 'React Native is typing'
          }
        })
      }
    }

    setTimeout(() => {
      if (this._isMounted === true) {
        if (messages.length > 0) {
          if (messages[0].image) {
            this.onReceive('Nice picture!')
          } else if (messages[0].location) {
            this.onReceive('My favorite place')
          } else {
            if (!this._isAlright) {
              this._isAlright = true
              this.onReceive('Alright')
            }
          }
        }
      }

      this.setState((previousState) => {
        return {
          typingText: null,
        }
      })
    }, 1000)
  }

  onReceive(text) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            // avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        }),
      }
    })
  }

  renderCustomActions(props) {
    if (Platform.OS === 'ios') {
      return (
        <Text>test</Text>
        // <Icon name="mic" />
      )
    } else {
      return (
        <TouchableOpacity
          style={{paddingBottom: 8, paddingLeft: 12}}
          onPress={this._buttonClick}
        >
          <Icon name="ios-mic" />
        </TouchableOpacity>
      )
    }
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#ffffff',
          }
        }}
      />
    )
  }

  renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />
    )
  }

  renderCustomView(props) {
    console.log('customView', props)
    return (
      <CustomView
        {...props}
      />
    )
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      )
    }
    return null
  }

  // Speech to text
  async _buttonClick() {
    try {
      var spokenText = await SpeechAndroid.startSpeech("Speak yo", SpeechAndroid.INDONESIAN)
      ToastAndroid.show(spokenText, ToastAndroid.LONG)
      alert(spokenText)
    } catch (error) {
      switch (error) {
        case SpeechAndroid.E_VOICE_CANCELLED:
          ToastAndroid.show("Voice Recognizer cancelled", ToastAndroid.LONG)
          break
        case SpeechAndroid.E_NO_MATCH:
          ToastAndroid.show("No match for what you said", ToastAndroid.LONG)
          break
        case SpeechAndroid.E_SERVER_ERROR:
          ToastAndroid.show("Google Server Error", ToastAndroid.LONG)
          break
        default:
        alert(error)
      }
    }
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        loadEarlier={this.state.loadEarlier}
        onLoadEarlier={this.onLoadEarlier}
        isLoadingEarlier={this.state.isLoadingEarlier}

        user={{
          _id: 1, // sent messages should have same user._id
        }}

        renderActions={this.renderCustomActions}
        renderBubble={this.renderBubble}
        renderSystemMessage={this.renderSystemMessage}
        renderCustomView={this.renderCustomView}
        renderFooter={this.renderFooter}
        renderMessage={this.renderMessage}
      />
    )
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
})

export default Chat