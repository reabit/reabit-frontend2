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

const winSize = Dimensions.get('window')
class Home extends Component {
  static navigationOptions = {
    title: 'Home'
  }
  // componentDidMount() {
  //   if (!EventEmitter.listeners('myEvent').length) {
  //     EventEmitter.addListener('myEvent', this.handleMyEvent);
  //   }
  // }

  render() {
    return (
      <Container>
        <Content style={ styles.content }>
          <List>
            <ListItem avatar  style={{
            marginLeft: 2,
            }}>
              <Left style={{
                width: winSize.width / 6
              }}>
                <Thumbnail source={{ uri: 'https://www.shareicon.net/download/2016/07/10/119669_people_512x512.png' }} />
              </Left>
              <Body style={{
                marginLeft: 3,
                width: winSize.width / 2
              }}>
                <Text style={{
                  textAlign: 'left',
                  marginRight: 0
                }}>Title Article</Text>
                <Text note style={{
                  textAlign: 'left',
                  marginRight: 0,

                }}>Description Article asdsd</Text>
              </Body>
                <View style={styles.buttonView}>
                  <Button small success vertical 
                  style={styles.button}
                  >
                    <Icon name="checkmark" />

                  </Button>
                  <Button small danger vertical
                  style={styles.button}>
                    <Icon name="trash" />

                  </Button>
                </View>
            </ListItem>
          </List>
        </Content>
        <Footer>
          <FooterTab>
            <Button active vertical>
              <Icon name="chatboxes" />
              <Text>Chat</Text>
            </Button>
            <Button  badge vertical>
              <Badge>
                <Text>10</Text>
              </Badge>
              <Icon name="list-box" />
              <Text>Article</Text>
            </Button>
            <Button active badge vertical>
              <Badge>
                <Text>2</Text>
              </Badge>
              <Icon active name="md-book" />
              <Text>Read</Text>
            </Button>
            <Button vertical>
              <Icon name="md-clipboard" />
              <Text>History</Text>
            </Button>
          </FooterTab>
        </Footer>
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
