import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import { 
  Container,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  Text
} from 'native-base';

import { Menu } from './components'
import { HistoryChart, HistoryList} from './components'

const winSize = Dimensions.get('window')
class ReadingHistory extends Component {
  constructor (props) {
    super(props)
    this.state ={
      menuActive: {
        home: false,
        chat: false,
        read: false,
        history: true
      }
    }
  }
  static navigationOptions = {
    header: null
  }

  // componentDidMount() {
  //   if (!EventEmitter.listeners('myEvent').length) {
  //     EventEmitter.addListener('myEvent', this.handleMyEvent);
  //   }
  // }

  render() {
    const { navigate } = this.props.navigation
    return (
      <Container>
        <Tabs>
          <Tab heading={
            <TabHeading style={{ backgroundColor: '#4060B8' }}>
              <Icon name="ios-pie-outline" />
              <Text>Overview</Text>
            </TabHeading>
          }>
            <HistoryChart />
          </Tab>
          <Tab heading={
            <TabHeading style={{ backgroundColor: '#4060B8' }}>
              <Icon name="ios-list-box-outline" />
              <Text>List</Text>
            </TabHeading>
          }>
            <HistoryList />
          </Tab>
        </Tabs>
        <Menu navigate={navigate} menuActive={this.state.menuActive}/>
      </Container>
    )
  }
}

const styles = {
  content: {
    backgroundColor: '#fff'
  }
}

export default ReadingHistory
