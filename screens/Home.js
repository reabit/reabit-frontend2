import React, { Component } from 'react'
import { Dimensions, AppState } from 'react-native'
import {
  Container,
  Content,
  Icon,
  H2,
  Text,
  Left,
  Body,
  Right,
  Card,
  CardItem,
  Thumbnail
} from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import {
  VictoryChart,
  VictoryTheme,
  VictoryLine
} from 'victory-native'
import { connect } from 'react-redux'

import PushNotification from '../notificationConfigure'
import { Menu, HandleChart, HandleEmptyChart } from './components'
import firebase from '../firebase'

const winSize = Dimensions.get('window')
class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: firebase.auth().currentUser,
      menuActive: {
        home: true,
        chat: false,
        read: false,
        history: false
      }
    }
  }

  static navigationOptions = {
    header: null
  }

  componentDidMount () {
    AppState.addEventListener('change', this.handleAppStateChange.bind());
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (appState) => {
    let dateNow = new Date().getDate()
    let monthNow = new Date().getMonth()
    let yearNow = new Date().getFullYear()
    // console.log('ini props',this.props)
    if(this.props.articles) {
      let filter = this.props.articles.filter((article) => {
        let date = new Date(article.createdAt)
        let getDate = date.getDate()
        let getYear = date.getFullYear()
        let getMonth = date.getMonth()
        let statusRead = article.statusRead
        return getDate <= dateNow  && monthNow === getMonth && yearNow === getYear && statusRead === false
      })

      if(filter.length) {
        let message = []
        filter.map((msg) => {
          message.push(msg.title)
        })

        //3*60*60*1000 convert 3 hour to milisecond

        if (appState == 'background') {
          PushNotification.localNotificationSchedule({
            smallIcon: "ic_notification",
            color: "red",
            vibrate: true,
            vibration: 300,
            title: "Artikel Yang Belum Anda Baca",
            badge: 1,
            playSound: true,
            soundName: 'default',
            message: message.join(', '), // (required)
            date: new Date(Date.now() + (3*60*60*1000)) // in 60 secs
          });
        }
      }
    }
  }

  render() {
    const { navigate } = this.props.navigation
    let chartComponent
    if (this.props.summaries.length) {
      chartComponent = <HandleChart />
    } else {
      chartComponent = <HandleEmptyChart navigate={navigate}/>
    }

    let unread = this.props.articles.filter(article => {
      return article.statusRead === false
    }).length

    let done = this.props.articles.filter(article => {
      return article.statusRead === true
    }).length
    //3F51B5, 2874F0
    return (
      <Container style={ styles.content }>
        <Content>
          <Grid>
            <Row
              style={{ backgroundColor: '#4060B8',  paddingTop: 17, paddingBottom: 17 }} >
              <Col style={{ alignItems: 'center' }}>
                <Thumbnail source={{ uri: this.state.user.photoURL }} />
                <H2 style={{ color: '#FFFFFF', paddingTop: 10 }}>
                  {this.state.user.displayName}
                </H2>
                <Text note style={{ color: '#E0E0E0', fontSize: 10, marginRight: 0 }} >
                  Last login: {new Date(this.state.user.metadata.lastSignInTime).toLocaleString()}
                </Text>
              </Col>
            </Row>
            <Row style={{ paddingTop: 17, paddingBottom: 17 }} >
              <Col style={{ alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', color: '#4060B8' }}>
                  {this.props.articles.length}
                </Text>
                <Text>Articles</Text>
              </Col>
              <Col style={{ alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', color: '#4060B8' }}>{unread}</Text>
                <Text>Unread</Text>
              </Col>
              <Col style={{ alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', color: '#4060B8' }}>{done}</Text>
                <Text>Done</Text>
              </Col>
            </Row>
          </Grid>
          {this.props.summaries.length != 0 && <HandleChart />}
          {this.props.summaries.length === 0 && <HandleEmptyChart navigate={navigate} />}

        </Content>
        <Menu navigate={navigate} menuActive={this.state.menuActive}/>
      </Container>
    )
  }
}

const styles = {
  content: {
    backgroundColor: '#fff'
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.articlesReducers.articles,
    summaries: state.summariesReducers.summaries
  }
}

export default connect(mapStateToProps, null)(Home)
