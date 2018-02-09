import React, { Component } from 'react'
import { 
  Footer,
  FooterTab,
  Button,
  Text,
  Icon,
  Badge
} from 'native-base'

class Menu extends Component {
  constructor(props){
    super(props)
  }
  render() {
    const navigate = this.props.navigate
    return (
      <Footer>
        <FooterTab>
            <Button active vertical >
              <Icon name="ios-home-outline" />
              <Text>Home</Text>
            </Button>
            <Button active vertical
              onPress={() => navigate('Chat')}
            >
              <Icon name="chatboxes" />
              <Text>Chat</Text>
            </Button>
            
            <Button active badge vertical
              onPress={() => navigate('ReadingList')}
            >
              <Badge>
                <Text>2</Text>
              </Badge>
              <Icon active name="md-book" />
              <Text>Read</Text>
            </Button>
            <Button vertical onPress={()=>navigate('History')}>
              <Icon name="md-clipboard" />
              <Text>History</Text>
            </Button>
            <Button vertical>
              <Icon name="md-exit" />
              <Text>Logout</Text>
            </Button>
        </FooterTab>
      </Footer>
    )
  }
}

export default Menu