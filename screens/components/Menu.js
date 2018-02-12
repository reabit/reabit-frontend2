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

import firebase from '../../firebase'

class Menu extends Component {
  async logout () {
    try {
      await firebase.auth().signOut()
      this.props.navigate('Login')
    } catch (err) {
      alert(err)
    }
  }

  render() {
    let unreadArticles = this.props.articles.filter(article => {
      return article.statusRead === false
    }).length
    const navigate = this.props.navigate
    return (
      <Footer>
        <FooterTab>
            <Button active vertical onPress={() => navigate('Home')}>
              <Icon name="ios-home-outline" />
              <Text style={ styles.fontButton }>Home</Text>
            </Button>

            <Button active vertical onPress={() => navigate('Chat')}>
              <Icon name="ios-chatbubbles-outline" />
              <Text style={ styles.fontButton }>Chat</Text>
            </Button>

            <Button active badge vertical onPress={() => navigate('ReadingList')}>
              <Badge>
                <Text>{unreadArticles}</Text>
              </Badge>
              <Icon active name="ios-book-outline" />
              <Text style={ styles.fontButton }>Read</Text>
            </Button>

            <Button vertical onPress={() => navigate('ReadingHistory')}>
              <Icon name="ios-clipboard-outline" />
              <Text style={ styles.fontButton }>History</Text>
            </Button>

            <Button vertical onPress={() => this.logout()}>
              <Icon name="ios-log-out-outline" />
              <Text style={ styles.fontButton }>Log out</Text>
            </Button>
        </FooterTab>
      </Footer>
    )
  }
}

const styles = {
  fontButton: {
    fontSize: 8
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.articlesReducers.articles
  }
}

export default connect(mapStateToProps, null)(Menu)