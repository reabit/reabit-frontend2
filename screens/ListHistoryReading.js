import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'
import { 
  Container, 
  Header, 
  Content, 
  List, 
  Button,
  Icon,
  ListItem, 
  Thumbnail, 
  Text, 
  Body 
} from 'native-base';

const winSize = Dimensions.get('window')

class ListHistoryReading extends Component {

  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem>
              <Thumbnail square size={80} source={{ uri: 'https://www.shareicon.net/download/2016/07/10/119669_people_512x512.png' }} />
              <Body>
                <Text>Sankhadeep</Text>
                <Text note>Its time to build a difference . .</Text>
              </Body>
              <View style={styles.buttonView}>
                  <Button small danger vertical
                  style={styles.button}>
                  <Text style={styles.text}>80%</Text>
                  </Button>
                  <Button small success vertical 
                  style={styles.button}
                  >
                    <Icon name="ios-book-outline" />

                  </Button>
                </View>
            </ListItem>
          </List>
        </Content>
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
  },
  text: {
    padding: 2.5
  }
}

export default ListHistoryReading