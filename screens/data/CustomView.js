import PropTypes from 'prop-types'
import React from 'react'
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Body,
  Right,
  Icon,
  Button
} from 'native-base'
import axios from 'axios'

import firebase from '../../firebase'

export default class CustomView extends React.Component {
  state = {
    dataCategories : this.props.currentMessage.dataFromBot ? this.props.currentMessage.dataFromBot : ''
  }

  addToReadingList(url){
    console.log(url)
    axios.post('http://apibucket.sabikaorganizer.com:3008/readings/set', {
      url: url,
      category: this.props.currentMessage.category
    }, {
      headers: {
        email: firebase.auth().currentUser.email
      }
    })
    .then(result => {
      console.log(result.data, 'dari add to reading list')
    })
  }
  
  render() {
    if (this.props.currentMessage.dataFromBot) {
      return (
        <Container
          style={{width: 300}}
        >
          <Content>
            <List>
              {this.props.currentMessage.dataFromBot.map((article, idx) => {
                return (
                  <ListItem
                    style={{marginLeft: 15, marginRight: 15, paddingRight: 0}}
                    key={idx}
                  >
                    <Body
                      style={{width: 250}}
                    >
                      <Text style={{marginLeft: 0, marginRight: 0}} >{article.title}</Text>
                    </Body>
                    <Right>
                      <Icon name="add-circle" style={{fontSize: 24, color: 'green'}} onPress={() => this.addToReadingList(article.url)}/>
                    </Right>
                  </ListItem>
                )
              })}
            </List>
          </Content>
        </Container>
      )
    }
    return null
  }
}
