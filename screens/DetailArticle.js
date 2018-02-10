import React, { Component } from 'react'
import { connect } from 'react-redux'

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

import Menu from './Menu'

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
    let article = this.props.articles.filter(article => {
      return article._id === this.props.navigation.state.params.id
    })

    this.setState({
      title: article[0].title,
      article: article[0].article,
      date: article[0].createdAt,
      author: article[0].author,
      category: article[0].category,
      decription: article[0].description,
      img: article[0].img
    })
    console.log('article', article[0])
  }

  
  render() {
    console.log('articles', this.props)
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
          <Menu navigate={navigate} />
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

const mapStateToProps = (state) => {
  return {
    articles: state.articlesReducers.articles
  }
}

export default connect(mapStateToProps, null)(DetailArticle)
