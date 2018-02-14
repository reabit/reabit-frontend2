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
    console.log('menu', this.props.menuActive)
    let unreadArticles = this.props.articles.filter(article => {
      return article.statusRead === false
    }).length
    const navigate = this.props.navigate
    return (
      <Footer>
        <FooterTab style={{ backgroundColor: '#2874F0' }}>
            <Button 
              active={this.props.menuActive.home}
              vertical onPress={() => navigate('Home')}
              style={styles.button}
            >
              <Icon
                active={this.props.menuActive.home}
                name="ios-home-outline"
                style={this.props.menuActive.home ? null : styles.white}
              />
              <Text 
                style={[
                  styles.fontButton, 
                  this.props.menuActive.home ? null : styles.white
                ]}
              >
              Home</Text>
            </Button>

            <Button 
              active={this.props.menuActive.chat}
              vertical onPress={() => navigate('Chat')}
              style={styles.button}
            >
              <Icon
                active={this.props.menuActive.chat}
                name="ios-chatbubbles-outline"
                style={this.props.menuActive.chat ? null : styles.white}
              />
              <Text 
                style={[
                  styles.fontButton, 
                  this.props.menuActive.chat ? null : styles.white
                ]}
              >
              Chat</Text>
            </Button>

            <Button
              active={this.props.menuActive.read}
              badge vertical onPress={() => navigate('ReadingList')}
              style={styles.button}
            >
              <Badge>
                <Text>{unreadArticles}</Text>
              </Badge>
              <Icon
                active={this.props.menuActive.read}
                name="ios-book-outline"
                style={this.props.menuActive.read ? null : styles.white}
              />
            <Text 
              style={[
                styles.fontButton,
                this.props.menuActive.read ? null : styles.white
              ]}
            >
              Read</Text>
            </Button>

            <Button
              active={this.props.menuActive.history}
              vertical onPress={() => navigate('ReadingHistory')}
              style={styles.button}
            >
              <Icon
                active={this.props.menuActive.history}
                name="ios-clipboard-outline"
                style={this.props.menuActive.history ? null : styles.white}
              />
              <Text style={[
                  styles.fontButton,
                  this.props.menuActive.history ? null : styles.white
                ]}
              >
              History</Text>
            </Button>

            <Button
              vertical onPress={() => this.logout()}
              style={styles.button}
            >
              <Icon 
                name="ios-log-out-outline" 
                style={styles.white}
              />
              <Text
                style={[
                  styles.fontButton,
                  styles.white
                ]}>
                Log out</Text>
            </Button>
        </FooterTab>
      </Footer>
    )
  }
}

const styles = {
  fontButton: {
    fontSize: 8
  },
  white: {
    color: '#FFFFFF'
  },
  button: {
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 0
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.articlesReducers.articles
  }
}

export default connect(mapStateToProps, null)(Menu)