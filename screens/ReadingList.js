import React, { Component } from 'react'
import { View, Dimensions, ListView } from 'react-native'
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Badge,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Card,
  CardItem
} from 'native-base'

const datas = [
  'Simon Mignolet',
  'Nathaniel Clyne',
  'Dejan Lovren',
  'Mama Sakho',
  'Alberto Moreno',
  'Emre Can',
  'Joe Allen',
  'Phil Coutinho',
]

const winSize = Dimensions.get('window')

class ReadingList extends Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 })
    this.state = {
      basic: true,
      listViewData: datas,
    }
  }

  static navigationOptions = {
    title: 'Reading List',
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow()
    const newData = [...this.state.listViewData]
    newData.splice(rowId, 1)
    this.setState({ listViewData: newData })
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <Container>
        <Content style={styles.content}>
          <List
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <ListItem>
                <Text>{data}</Text>
              </ListItem>}
            renderLeftHiddenRow={data =>
              <Button full onPress={() => navigate('Chat')}>
                <Icon active name="md-checkmark-circle-outline" style={{ color: '#ffffff'}}/>
              </Button>}
            leftOpenValue={75}
            disableLeftSwipe={true}
            style={{ paddingLeft: 17 }}
          />
        </Content>
        <Footer>
          <FooterTab>
            <Button active vertical>
              <Icon name="chatboxes" />
              <Text>Chat</Text>
            </Button>
            <Button badge vertical>
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
      </Container>
    )
  }
}

const styles = {
  content: {
    backgroundColor: '#fff'
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0,
    width: winSize.width / 3,
  },
  button: {
    margin: 2
  }
}

export default ReadingList