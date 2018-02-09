import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Badge,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Card,
  CardItem
} from 'native-base'
import Menu from './Menu'

import MenuFooters from './MenuFooters'

const winSize = Dimensions.get('window')
class Home extends Component {
  // componentDidMount() {
  //   if (!EventEmitter.listeners('myEvent').length) {
  //     EventEmitter.addListener('myEvent', this.handleMyEvent);
  //   }
  // }

  render() {
    const { navigate } = this.props.navigation
    return (
      <Container>
        <Content>
        <Card>
          <CardItem>
            <Text>Reading List</Text>
          </CardItem>
          <CardItem>
            <Left style={{ marginLeft: 10 }}>
              <Body>
                <Icon name="md-bookmarks" style={{fontSize: 130, color: 'blue'}} />
              </Body>
            </Left>
            <Right style={{ marginRight: 10 }}>
              <Body>
                <Text style={{fontSize: 100, color: 'blue'}}>60</Text>
              </Body>
            </Right>
          </CardItem>
       </Card>
       <Card>
          <CardItem> 
            <Text>Graphic Summary</Text>
          </CardItem>
          <CardItem>
            <Left style={{ marginLeft: 10 }}>
              <Body>
                <Icon name="md-bookmarks" style={{fontSize: 130, color: 'blue'}} />
              </Body>
            </Left>
            <Right style={{ marginRight: 10 }}>
              <Body>
                <Text style={{fontSize: 100, color: 'blue'}}>60</Text>
              </Body>
            </Right>
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
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0,
    width: winSize.width / 3,
  },
  button: {
    margin: 2
  }
}

export default Home
