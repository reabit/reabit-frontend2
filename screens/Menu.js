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
                <Text>2</Text>
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

export default Menu