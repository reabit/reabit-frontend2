import React, { Component } from 'react'
import axios from 'axios'

import { 
  View, 
  Dimensions 
} from 'react-native'

import { 
  Container, 
  Header, 
  Content, 
  Spinner,
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

  constructor(props) {
    super(props)
    this.state= {
      historys: ''
    }
  }

  componentDidMount() {
    axios.get(`http://apibucket.sabikaorganizer.com:3008/summarys/list`)
      .then(({data}) => {
        console.log(data.data)
        this.setState({
          historys: data.data
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    if (!this.state.historys) {
      return (
        <Container>
          <Content>
            <Spinner color='blue' />
          </Content>
        </Container>
      )
    } else {
      return (
        <Container>
          <Content>
            <List>
                { this.state.historys.map((history,idx) => {
                  let similarity = '';
                  if(history.similarity === true) {
                    similarity = <Icon name="ios-happy-outline" />
                  } else {
                    similarity = <Icon name="ios-sad-outline" />
                  }
                return (
                      <ListItem key={idx}>
                        <Thumbnail square size={80} source={{ uri: history.idReading.img }} />
                        <Body>
                          <Text>{ (history.idReading.title.length > 30 ? history.idReading.title.substr(0, 30)+'...' : history.idReading.title) }</Text>
                        </Body>
                        <View style={styles.buttonView}>
                            <Button small danger vertical
                            style={styles.button}>
                            { similarity }
                            </Button>
                            {/* <Button small success vertical 
                            style={styles.button}
                            >
                              <Icon name="ios-book-outline" />

                            </Button> */}
                        </View>
                      </ListItem>
                    )
                  }
                )
              }
            </List>
          </Content>
        </Container>
      )
    }
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