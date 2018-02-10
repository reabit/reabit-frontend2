import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'
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
import Menu from './Menu'

import { VictoryPie, VictoryChart, VictoryTheme, VictoryLine, VictoryBar } from 'victory-native'

const winSize = Dimensions.get('window')
class Home extends Component {
  // componentDidMount() {
  //   if (!EventEmitter.listeners('myEvent').length) {
  //     EventEmitter.addListener('myEvent', this.handleMyEvent);
  //   }
  // }

  render() {
    const { navigate } = this.props.navigation

    let data = []

    for (let index = 0; index <= 12; index++) {
      let mouthData = {
        y: Math.floor(Math.random()*12),
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
                <Text style={{fontSize: 100, color: '#66b3ff'}}>60</Text>
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

export default Home
