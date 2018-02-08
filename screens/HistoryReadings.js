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

import MenuFooters from './MenuFooters'
import GraficReading from './GraficReading'
import ListHistoryReading from './ListHistoryReading'

const winSize = Dimensions.get('window')
class HistoryReadings extends Component {
  // componentDidMount() {
  //   if (!EventEmitter.listeners('myEvent').length) {
  //     EventEmitter.addListener('myEvent', this.handleMyEvent);
  //   }
  // }

  render() {
    return (
      <Container>
        <Tabs>
          <Tab heading={ <TabHeading><Icon name="ios-pie-outline" /><Text>Grafic</Text></TabHeading>}>
            <GraficReading />
          </Tab>
          <Tab heading={ <TabHeading><Icon name="ios-list-box-outline" /><Text>List</Text></TabHeading>}>
            <ListHistoryReading />
          </Tab>
        </Tabs>
        <MenuFooters />
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
