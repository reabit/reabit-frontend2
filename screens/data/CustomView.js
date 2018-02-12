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
import { FlatList } from 'react-native'

import firebase from '../../firebase'

export default class CustomView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    dataCategories : this.props.currentMessage.dataFromBot ? this.props.currentMessage.dataFromBot : '',      
      testing: 'ada'
    }
  }
  // state = {
  //   dataCategories : this.props.currentMessage.dataFromBot ? this.props.currentMessage.dataFromBot : '',
  //   testing: 'ada'
  // }

  addToReadingList(url){
    console.log(this.state.testing)
    this.setState(() => {
      return {

        testing: 'ada apa dengan cinta'
      }
    })
    console.log(this.state.testing)
    // this.state.testing = 'ada apa dengan cinta'
    console.log(this.state.dataCategories, 'from add to reagind list')
    console.log(url)
    this.state.dataCategories = this.state.dataCategories.filter(article => {
      if(article.url !== url){
        return article
      }
    })
    console.log(this.state.dataCategories)
    axios.post('http://apibucket.sabikaorganizer.com:3008/readings/set', {
      url: url,
      category: this.props.currentMessage.category
    }, {
      headers: {
        email: 'zuhri.nurhuda@gmail.com'
      }
    })
    .then(result => {
      
      console.log(result.data, 'dari add to reading list')
    })
  }
  
  render() {
    if (this.state.dataCategories) {
      return (
        <Container
          style={{width: 300}}
        >
          <Content>
            <List>
              {this.state.dataCategories.map((article, idx) => {
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
