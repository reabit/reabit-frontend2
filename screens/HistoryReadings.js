import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'
import { 
  Container, 
  Header, 
  Tab, 
  Tabs, 
  TabHeading, 
  Icon, 
  Text,
  Footer,
  FooterTab,
  Badge,
  Button
} from 'native-base';

import Menu from './Menu'
import GraficReading from './GraficReading'
import ListHistoryReading from './ListHistoryReading'

const winSize = Dimensions.get('window')
class HistoryReadings extends Component {
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
          <Tab heading={ <TabHeading><Icon name="ios-pie-outline" /><Text>Chart</Text></TabHeading>}>
            <GraficReading />
          </Tab>
          <Tab heading={ <TabHeading><Icon name="ios-list-box-outline" /><Text>List</Text></TabHeading>}>
            <ListHistoryReading />
          </Tab>
        </Tabs>
        <Menu navigate={navigate} />
      </Container>
    )
  }
}

const styles = {
  content: {
    backgroundColor: '#fff'
  }
}

export default HistoryReadings
