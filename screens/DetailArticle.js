import React, { Component } from 'react'
import axios from 'axios'

import { 
  View, 
  Dimensions, 
  Image 
} from 'react-native'

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
  CardItem,
  Spinner
} from 'native-base'

import MenuFooters from './MenuFooters'

const winSize = Dimensions.get('window')
class DetailArticle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      article: '',
      date: '',
      author: '',
      category: '',
      decription: '',
      img: ''
    }
  }
  
  componentDidMount = () => {
    let idArticle = '5a7d12f39979205e39026a3e' || this.props.navigation.state.params.id;
    let url = `http://apibucket.sabikaorganizer.com:3008/readings/detail/${idArticle}`
    axios.get(url)
     .then(({ data }) => {
       console.log(data.data)
       this.setState({
          title: data.data.title,
          article: data.data.article,
          date: data.data.date,
          author: data.data.author,
          category: data.data.category,
          description: data.data.description,
          img: data.data.img
        })
     })
     .catch(err => console.log(err))
  }

  
  render() {
    const { navigate } = this.props.navigation
    if(!this.state.title){
      return (
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => navigate('ReadingList')}>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>Detail Article</Title>
            </Body>
          </Header>
          <Content>
          <Spinner color='blue' />
          </Content>
        </Container>
      )
    } else {
      return (
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => navigate('ReadingList')} >
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>Detail Article</Title>
            </Body>
          </Header>
          <Content>
            <Card style={{flex: 0}}>
              <CardItem>
                <Left>
                  <Body>
                    <Text>{this.state.title}</Text>
                    <Text note>{this.state.date}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem>
                <Body>
                  <Image source={{ uri: this.state.img }} style={{height: 200, width: '100%', flex: 1}}/>
                  <Text style={styles.decription}>{this.state.description}</Text>
                  { this.state.article.map((art,idx) => {
                        return (
                          <Content key={idx}>
                            <Text style={styles.article}>{art}</Text>
                          </Content>       
                        )
                      }
                    ) 
                  }
                </Body>
              </CardItem>
            </Card>
          </Content>
          <MenuFooters />
        </Container>
      )
    }
  }
}

const styles = {
  content: {
    backgroundColor: '#fff'
  },
  decription: {
    fontSize: 13,
    fontStyle: 'italic'
  },
  article: {
    fontSize: 13,
    fontWeight: 'normal',
    textAlign: 'justify'
  }
}

export default DetailArticle
