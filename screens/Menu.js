import React, { Component } from 'react'
import { 
  Footer,
  FooterTab,
  Button,
  Text,
  Icon,
  Badge
} from 'native-base'

import { connect } from 'react-redux'

class Menu extends Component {
  constructor(props){
    super(props)
  }
  render() {
    console.log('articles menu', this.props.articles)
    let unreadArticles = this.props.articles.filter(article => {
      return article.statusRead === false
    }).length
    const navigate = this.props.navigate
    return (
      <Footer>
        <FooterTab>
            <Button active vertical 
              onPress={() => navigate('Home')}
            >
              <Icon name="ios-home-outline" />
              <Text style={ styles.fontButton }>Home</Text>
            </Button>
            <Button active vertical
              onPress={() => navigate('Chat')}
            >
              <Icon name="chatboxes" />
              <Text style={ styles.fontButton }>Chat</Text>
            </Button>
            
            <Button active badge vertical
              onPress={() => navigate('ReadingList')}
            >
              <Badge>
              <Text>{unreadArticles}</Text>
              </Badge>
              <Icon active name="md-book" />
              <Text style={ styles.fontButton }>Read</Text>
            </Button>
            <Button vertical onPress={()=>navigate('HistoryReadings')}>
              <Icon name="md-clipboard" />
              <Text style={ styles.fontButton }>History</Text>
            </Button>
            <Button vertical>
              <Icon name="md-exit" />
              <Text style={ styles.fontButton }>Logout</Text>
            </Button>
        </FooterTab>
      </Footer>
    )
  }
}

const styles = {
  fontButton: {
    fontSize:8
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.articlesReducers.articles
  }
}

export default connect(mapStateToProps, null)(Menu)