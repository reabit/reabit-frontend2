import React, { Component } from 'react'
import { View, Dimensions, Image } from 'react-native'
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Text,
  Title,
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

import MenuFooters from './MenuFooters'

const winSize = Dimensions.get('window')
class DetailArticle extends Component {
  static navigationOptions = {
    title: 'Detail Article'
  }
  // componentDidMount() {
  //   if (!EventEmitter.listeners('myEvent').length) {
  //     EventEmitter.addListener('myEvent', this.handleMyEvent);
  //   }
  // }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
        </Header>
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: 'https://www.shareicon.net/download/2016/07/10/119669_people_512x512.png' }} />
                <Body>
                  <Text>NativeBase NativeBase NativeBase NativeBase NativeBase</Text>
                  <Text note>April 15, 2016</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{ uri: 'https://cdn-images-1.medium.com/max/800/1*WFx8Z7vxXXdFj9BsXDtTjQ.jpeg' }} style={{height: 200, width: '100%', flex: 1}}/>
                <Text>
                On February 2015, Vint Cerf, also known as the father of the internet, issued a warning to humanity - that of a possible dark age and a lost generation simply because the systems of the future will not be able to render the files of the present.
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
        <MenuFooters />
      </Container>
    )
  }
}

const styles = {
  content: {
    backgroundColor: '#fff'
  }
}

export default DetailArticle
