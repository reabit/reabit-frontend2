import React, { Component } from 'react'
import { 
  View, 
  Dimensions,
  AppState
} from 'react-native'
import {
  Container,
  Header,
  Content,
  Icon,
  H1,
  Text,
  Left,
  Body,
  Right,
  Card,
  CardItem
} from 'native-base'
import { VictoryPie, VictoryChart, VictoryTheme, VictoryLine, VictoryBar } from 'victory-native'
import { connect } from 'react-redux'

import PushNotification from '../notificationConfigure'
import Menu from './Menu'
import { fetch_articles_from_api } from '../redux/actions/articlesActions'
import { fetch_summaries_from_api } from '../redux/actions/summariesActions'

const winSize = Dimensions.get('window')
class Home extends Component {

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
      let mouthData = {
        y: lengthMonth.length,
        x: index
      }
      data.push(mouthData);
    }

    return (
      <Container style={ styles.content }>
        <Content>
        <Card>
          <CardItem style={{ justifyContent: 'center', marginBottom:-15 }}>
          <H1>Header One</H1>
          </CardItem>
          <CardItem>
            <Left style={{ marginLeft: 10 }}>
              <Body>
                <Icon name="md-bookmarks" style={{fontSize: 130, color: '#66b3ff'}} />
              </Body>
            </Left>
            <Right style={{ marginRight: 10 }}>
              <Body>
                <Text style={{fontSize: 100, color: '#66b3ff'}}>{this.props.articles.length}</Text>
              </Body>
            </Right>
          </CardItem>
       </Card>
       <Card>
       <CardItem style={{ justifyContent: 'center', marginBottom:-15 }}>
            <H1>Graphic Summary</H1>
          </CardItem>
          <CardItem>
            <Left style={{ marginLeft: -30 }}>
              <Body>
              <VictoryChart
                theme={VictoryTheme.material}
                animate={{
                  duration: 2000,
                  onLoad: { duration: 1000 }
                }}
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
            </Left>
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
