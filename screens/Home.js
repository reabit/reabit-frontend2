import React, { Component } from 'react'
import { Dimensions } from 'react-native'
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
import {
  VictoryChart,
  VictoryTheme,
  VictoryLine
} from 'victory-native'
import { connect } from 'react-redux'

import { Menu } from './components'
import firebase from '../firebase'
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
            <CardItem
              // style={{borderBottomWidth: 0.5, borderColor: '#C9C9C9'}}
            >
              <Left>
                <Thumbnail source={{ uri: this.state.user.photoURL }} />
                <Body>
                  <Text>{this.state.user.displayName}</Text>
                  <Text note>Last login: {new Date(this.state.user.metadata.lastSignInTime).toLocaleString()}</Text>
                </Body>
              </Left>
            </CardItem>
            {/* <CardItem header style={{ justifyContent: 'center', paddingBottom: 0 }}>
              <H2>Header One</H2>
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
            </CardItem> */}
          </Card>
          <Card>
            <CardItem header style={{ justifyContent: 'center', paddingBottom: 0 }}>
              <H2>Reading Summary</H2>
            </CardItem>
            <CardItem>
              {/* <Left style={{ marginLeft: -30 }}> */}
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
              {/* </Left> */}
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
