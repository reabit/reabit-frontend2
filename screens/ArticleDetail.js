import React, { Component } from 'react'
import { Dimensions, Image } from 'react-native'
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
import { connect } from 'react-redux'

import { Menu } from './components'
import { get_reading_status } from '../redux/actions/articlesActions'

const winSize = Dimensions.get('window')
class ArticleDetail extends Component {
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

  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    let articleId = this.props.navigation.state.params.id
    let article = this.props.articles.filter(article => {
      return article._id == articleId
    })
    console.log('ini article', article)
    this.setState({
      title: article[0].title,
      article: article[0].article,
      date: article[0].createdAt,
      author: article[0].author,
      category: article[0].category,
      decription: article[0].description,
      img: article[0].img
    })

    this.props.setArticleStatus(articleId)
  }
  
  render() {
    console.log('ini image', this.state.img)
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
                    <Text note>{new Date(this.state.date).toLocaleString()}</Text>
                    <Badge style={{ marginTop: 10 }}>
                      <Text>{this.state.category}</Text>
                    </Badge>
                  </Body>
                </Left>
              </CardItem>
              <CardItem style={{ paddingTop: 0 }}>
                <Body>
                  <Image source={{ uri: this.state.img }} style={{height: 200, width: '100%', flex: 1}}/>
                  <Text style={styles.decription}>{this.state.description}</Text>
                  {this.state.article.map((art,idx) => {
                    return (
                      <Content key={idx}>
                        <Text style={styles.article}>{art}</Text>
                      </Content>       
                    )}
                  )}
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

const mapDispatchToProps = (dispatch) => {
  return {
    setArticleStatus: (articleId) => dispatch(get_reading_status(articleId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail)
