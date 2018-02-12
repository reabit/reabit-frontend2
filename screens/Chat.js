import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  View
} from 'react-native'
import {
  Icon,
  Container,
  Text,
  Content,
  Footer,
  FooterTab,
  Button,
  Badge
} from 'native-base'
import {
  GiftedChat,
  Actions,
  Bubble,
  SystemMessage
} from 'react-native-gifted-chat'
import SpeechAndroid from 'react-native-android-voice'
import axios from 'axios'

import firebase from '../firebase'
import CustomView from './data/CustomView'
import { Menu } from './components'
import { summaryBot } from './data/summary'
import { connect } from 'react-redux'
import { fetch_chatbot_from_api } from '../redux/actions/chatbotActions'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
      idArticle: null
    }

    this._isMounted = false
    this._isAlright = null

    this.onSend = this.onSend.bind(this)
    this.onReceive = this.onReceive.bind(this)
    this.renderCustomActions = this.renderCustomActions.bind(this)
    this.renderBubble = this.renderBubble.bind(this)
    this.renderSystemMessage = this.renderSystemMessage.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.onLoadEarlier = this.onLoadEarlier.bind(this)
    this._buttonClick = this._buttonClick.bind(this)
  }

  static navigationOptions = {
    header: null
  }

  componentWillMount() {
    this.props.showMessages('help')
    this._isMounted = true

    if (this.props.navigation.state.params) {
      this.setState(() => {
        return {
          messages: summaryBot(this.props.navigation.state.params.title),
          idArticle: this.props.navigation.state.params.idArticle 
        }
      })
    } else {
      this.setState(() => {
        return {
          messages: require('./data/messages.js')
        }
      })
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  onLoadEarlier() {
    this.setState(previousState => {
      return {
        isLoadingEarlier: true
      }
    })

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState(previousState => {
          return {
            messages: GiftedChat.prepend(
              previousState.messages,
              require('./data/old_messages.js')
            ),
            loadEarlier: false,
            isLoadingEarlier: false
          }
        })
      }
    }, 1000) // simulating network
  }

  onSend(messages = []) {
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, messages)
      }
    })
     axios
      .post('http://apibucket.sabikaorganizer.com:3008/chatbot', {
        chat: messages[0].text
      })
      .then(result => {
        this.setState(previousState => {
          return {
            messages: GiftedChat.append(previousState.messages, [
              {
                _id: Math.round(Math.random() * 1000000),
                text: result.data.data,
                createdAt: new Date().getTime(),
                user: {
                  _id: 2,
                  name: 'Reading Habit'
                }
              }
            ])
          }
        })
        console.log(result.data, '-----------> category')
        if (result.data.category) {
          axios
            .post('http://apibucket.sabikaorganizer.com:3008/cheerio', {
              category: result.data.category
            })
            .then(categoryList => {
              this.answerDemo(categoryList.data, result.data.category)
            })
        } else if(result.data.summary) {
          axios.post(`http://apibucket.sabikaorganizer.com:3008/summarys/add/${this.state.idArticle}`, {
            summary: messages[0].text
          }, {
              headers: {
                email: firebase.auth().currentUser.email
              }
            })
          .then(resultSummary => {
            console.log(resultSummary, '-------------- ini dari then summary')
          })
        }
      })
      .catch(err => {
        console.log(err, 'ini error')
      })
  }

  answerDemo(dataFromBot, category = '') {
    console.log(dataFromBot, 'in answerDemo')
    this.setState(previousState => {
      return {
        typingText: 'Reabit is typing'
      }
    })
    setTimeout(() => {
      if (this._isMounted === true) {
        if (dataFromBot) {
          if (dataFromBot.messages == 'List Categories') {
            console.log('masuk ke sini')
            this.onReceive(
              'ini list artikel yang kamu minta, kamu bisa memilih artikel yang ingin kamu baca dengan menekan tombol tambah',
              dataFromBot.data,
              category
            )
            this.setState(previousState => {
              return {
                messages: GiftedChat.append(previousState.messages, [
                  {
                    _id: Math.round(Math.random() * 1000000),
                    text: 'masih bingung? ketik help',
                    createdAt: new Date().getTime(),
                    user: {
                      _id: 2,
                      name: 'Reading Habit'
                    }
                  }
                ])
              }
            })
          } else {
            this.onReceive('no data', dataFromBot.data)
          }
        }
      }

      this.setState(previousState => {
        return {
          typingText: null
        }
      })
    }, 1000)
  }

  onReceive(text, dataFromBot, category) {
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: text,
          dataFromBot: dataFromBot,
          category: category,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Reading Habit'
          }
        })
      }
    })
  }

  renderCustomActions(props) {
    return (
      <TouchableOpacity
        style={{ paddingBottom: 8, paddingLeft: 12 }}
        onPress={this._buttonClick}
      >
        <Icon name="ios-mic" />
      </TouchableOpacity>
    )
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#ffffff'
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
          marginBottom: 15
        }}
        textStyle={{
          fontSize: 14
        }}
      />
    )
  }

  renderCustomView(props) {
    return <CustomView {...props} />
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>{this.state.typingText}</Text>
        </View>
      )
    }
    return null
  }

  // Speech to text
  async _buttonClick() {
    try {
      var spokenText = await SpeechAndroid.startSpeech(
        'Listening...',
        SpeechAndroid.INDONESIAN
      )
      ToastAndroid.show(spokenText, ToastAndroid.LONG)
      console.log(spokenText, 'from buttonclick')
      let dataGoThroughChat = {
        text: spokenText,
        _id: Math.round(Math.random() * 1000000),
        user: {
          _id: 1
        }
      }
      this.onSend([dataGoThroughChat])
    } catch (error) {
      switch (error) {
        case SpeechAndroid.E_VOICE_CANCELLED:
          ToastAndroid.show('Voice Recognizer cancelled', ToastAndroid.LONG)
          break
        case SpeechAndroid.E_NO_MATCH:
          ToastAndroid.show('No match for what you said', ToastAndroid.LONG)
          break
        case SpeechAndroid.E_SERVER_ERROR:
          ToastAndroid.show('Google Server Error', ToastAndroid.LONG)
          break
        default:
          alert(error)
      }
    }
  }

  render() {
    const { navigate } = this.props.navigation

    return (
      <Container>
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend} //chat now
          loadEarlier={this.state.loadEarlier}
          onLoadEarlier={this.onLoadEarlier}
          isLoadingEarlier={this.state.isLoadingEarlier}
          user={{
            _id: 1 // sent messages should have same user._id
          }}
          renderActions={this.renderCustomActions}
          renderBubble={this.renderBubble}
          // renderSystemMessage={this.renderSystemMessage}
          renderFooter={this.renderFooter}
          renderCustomView={this.renderCustomView}
          renderMessage={this.renderMessage}
        />
        <Menu navigate={navigate} />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  footerText: {
    fontSize: 14,
    color: '#aaa'
  }
})

const mapStateToProps = (state) => {
  return {
    messages: state.chatbotReducers.messages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showMessages: (data) => dispatch(fetch_chatbot_from_api(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Chat)
