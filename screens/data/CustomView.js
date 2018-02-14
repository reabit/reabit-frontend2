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
import { connect } from 'react-redux'
import firebase from '../../firebase'
import { fetch_articles_from_api, add_article_from_api, remove_article_from_api } from '../../redux/actions/articlesActions'

class CustomView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    dataCategories : this.props.articleCategories.length !== 0 ? this.props.articleCategories : '',   
    dataArticleList: this.props.articleList,
    testing: 'ada',
    }
  }
  componentDidMount(){
    this.props.showArticleList()
  }

  addToReadingList(article){
    this.setState({
      testing: 'lagiiiiii'
    })
    this.props.addArticle({
      url: article.url,
      title: article.title,
      category: this.props.currentMessage.category
    })                           
  }

  removeToReadingList(article){
    let articleRemoved = this.state.dataArticleList.filter(a => {
      if(a.title == article.title){
        return a
      }
    })
    this.props.removeArticle(articleRemoved[0])
  }
  iconAddCancelArticle(article){
    let titleArticle = this.props.articleList.filter(a => {
      if(a.title == article.title){
        return a
      }
    })
    
    if(titleArticle.length !== 0){
      if(titleArticle[0].statusRead){
        return (
          <Icon name="md-book" style={{fontSize:35, color: 'black'}}/>
        )
      }else{
        return (
          <Icon name="md-checkmark-circle-outline" style={{fontSize: 35, color: 'blue'}} onPress={() => this.removeToReadingList(article)}/>
          
        )
      }
    }else{
      return (
        <Icon name="add-circle" style={{fontSize: 35, color: 'green'}} onPress={() => this.addToReadingList(article)}/>        
      )
    }
  }
  
  render() {
    if (this.props.currentMessage.category) {

      return (
        <Container
          style={{width: 300}}
        >
          <Content>
            <List>
              {this.props.articleCategories.map((article, idx) => {
                
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
                      {this.iconAddCancelArticle(article)}
                      
                      {/* {this.state.testing} */}
                      {/* {this.state.dataArticleList.filter(a =>{
                        return a.title == article.title
                      }).length > 0 ? 'test' : 'aja'} */}
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

const mapStateToProps = state => {
  return {
    articleCategories: state.articlesReducers.categories,
    articleList: state.articlesReducers.articles
  }
}
const mapDispatchToProps = dispatch => {
  return {
    showArticleList: () => dispatch(fetch_articles_from_api()),
    addArticle: (article) => dispatch(add_article_from_api(article)),
    removeArticle: (article) => dispatch(remove_article_from_api(article))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomView)