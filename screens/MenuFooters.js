import React, { Component } from 'react'
import { View } from 'react-native'
import {
  Container,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Badge
} from 'native-base'

class MenuFooters extends Component {
  render() {
    return (
        <Footer>
          <FooterTab>
            <Button active vertical>
              <Icon name="chatboxes" />
              <Text>Chat</Text>
            </Button>
            <Button  badge vertical>
              <Badge>
                <Text>10</Text>
              </Badge>
              <Icon name="list-box" />
              <Text>Article</Text>
            </Button>
            <Button active badge vertical>
              <Badge>
                <Text>2</Text>
              </Badge>
              <Icon active name="md-book" />
              <Text>Read</Text>
            </Button>
            <Button vertical>
              <Icon name="md-clipboard" />
              <Text>History</Text>
            </Button>
          </FooterTab>
        </Footer>
    )
  }
}

const styles = {
  content: {
    backgroundColor: '#fff'
  }
}

export default MenuFooters
