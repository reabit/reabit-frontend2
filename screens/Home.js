import React, { Component } from 'react'
<<<<<<< HEAD
import { 
  View, 
  Dimensions,
  AppState
} from 'react-native'
=======
import { Dimensions } from 'react-native'
>>>>>>> b889ff3d96f4337a5e72be17effc4e0376e31518
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

<<<<<<< HEAD
import PushNotification from '../notificationConfigure'
import Menu from './Menu'
=======
import { Menu } from './components'
import firebase from '../firebase'
>>>>>>> b889ff3d96f4337a5e72be17effc4e0376e31518
import { fetch_articles_from_api } from '../redux/actions/articlesActions'
import { fetch_summaries_from_api } from '../redux/actions/summariesActions'

const winSize = Dimensions.get('window')
class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: firebase.auth().currentUser
    }
  }

  static navigationOptions = {
    header: null
  }
  componentDidMount () {
    this.props.fetchArticles()
    this.props.fetchSummaries()
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

    let data = []
    for (let index = 0; index <= 12; index++) {
      let lengthMonth = this.props.summaries.filter(summary => {
        let setDate = new Date(summary.date)
        let month = setDate.getMonth()
        return month == index
      })
      let monthData = {
        y: lengthMonth.length,
        x: index
      }
      data.push(monthData);
    }

    return (
      <Container style={ styles.content }>
        <Content>
          <Card>
            <CardItem header 
              style={{
                backgroundColor: '#4060B8', //3F51B5, 2874F0
                justifyContent: 'center',
                paddingBottom: 0
              }}
            >
              <Thumbnail source={{ uri: this.state.user.photoURL }}/>
            </CardItem>
            <CardItem header
              style={{
                backgroundColor: '#4060B8',
                justifyContent: 'center'
              }}
            >
              <Body style={{
                alignItems: 'center'
              }}>
                <H2 style={{ color: '#FFFFFF' }}>
                  {this.state.user.displayName}
                </H2>
                <Text note 
                  style={{
                    color: '#E0E0E0',
                    fontSize: 10,
                    marginRight: 0
                  }}
                >
                  Last login: {new Date(this.state.user.metadata.lastSignInTime).toLocaleString()}
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Grid>
                <Row>
                  <Col style={{ alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', color: '#4060B8' }}>
                      {this.props.articles.length}
                    </Text>
                    <Text>Articles</Text>
                  </Col>
                  <Col style={{ alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', color: '#4060B8'}}>0</Text>
                    <Text>Unread</Text>
                  </Col>
                  <Col style={{ alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', color: '#4060B8'}}>0</Text>
                    <Text>Done</Text>
                  </Col>
                </Row>
              </Grid>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Text>Reading Summary</Text>
            </CardItem>
            <CardItem
              style={{
                paddingTop: 0,
                paddingRight: 17,
                paddingBottom: 0,
                paddingLeft: 17,
                marginTop: -17,
                marginBottom: -17
              }}
            >
              <Body>
                <VictoryChart
                  theme={VictoryTheme.material}
                  animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 }
                  }}
                  height={300}
                >
                  <VictoryLine
                    style={{
                      data: { stroke: "#66b3ff" },
                      parent: { border: "1px solid #ccc"}
                    }}
                    data={data}
                  />
                </VictoryChart>
              </Body>
            </CardItem>
          </Card>
        </Content>
        <Menu navigate={navigate} />
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

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticles: () => dispatch(fetch_articles_from_api()),
    fetchSummaries: () => dispatch(fetch_summaries_from_api())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
