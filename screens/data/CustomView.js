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
          <Content style={{width: 300}}>
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
      )
    }else if(this.props.currentMessage.help){
      console.log(this.props.currentMessage.navigate, 'from customview')
      const { navigate } = this.props.currentMessage
      return (
          <Content>
            <List>
              <ListItem>
                <Text>
                  Untuk meminta artikel, kamu cukup ketik artikel apa yang kamu inginkan, seperti 'Aku ingin artikel inspirasi'
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  Untuk memberikan rangkuman atas artikel yang telah kamu buat, kamu diharuskan untuk membaca artikel terlebih dahulu, lalu swipe artikel yang telah kamu baca di artikel list dan tekan tombol di sebelah kiri untuk memberikan rangkuman
                </Text>
              </ListItem>
              <ListItem>
                <Text onPress={() => navigate('Home')}>
                  Untuk Kembali ke Home, kamu bisa ketik 'navigasi ke home' atau bisa klik text ini
                </Text>
              </ListItem>
              <ListItem>
                <Text onPress={() => navigate('ReadingList')}>
                  Untuk melihat artikel yang kamu telah pilih untuk di baca,  kamu bisa ketik 'navigasi ke artikel list' atau bisa klik text ini
                </Text>
              </ListItem>
              <ListItem>
                <Text onPress={() => navigate('ReadingHistory')}>
                  Untuk melihat histori kegiatan yang telah kamu lakukan di sini, kamu bisa ketik 'navigasi ke historikal list' atau bisa klik text ini
                </Text>
              </ListItem>
              <ListItem>
                <Text onPress={() => navigate('logout')}>
                  Untuk melihat artikel yang kamu telah pilih untuk di baca kamu bisa ketik 'navigasi ke logout' atau bisa klik text ini
                </Text>
              </ListItem>
            </List>
          </Content>
      )
    }else{
      return null

    }
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