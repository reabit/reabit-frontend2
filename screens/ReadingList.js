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
import { connect } from 'react-redux'

import Menu from './Menu'

const winSize = Dimensions.get('window')

class ReadingList extends Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      basic: true,
      listViewData: this.props.articles,
    }
  }

  static navigationOptions = {
    title: 'Reading List',
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <Container>
        <Content style={styles.content}>
          <List
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <ListItem avatar style={{ marginLeft: 2 }}>
                <Left style={{ width: winSize.width / 6 }}>
                  <Thumbnail source={{ uri: data.img }} />
                </Left>
                <Body style={{ marginLeft: 3, width: winSize.width / 2}}>
                  <Text 
                    style={{ textAlign: 'left', marginRight: 0 }}
                    onPress={() => navigate('DetailArticle', { id: data._id })}
                  >
                    {data.title.length > 60 ? data.title.substr(0, 60)+'...' : data.title }
                  </Text>
                </Body>
              </ListItem>
            }
            renderLeftHiddenRow={data =>
              <Button full onPress={() => navigate('Chat', {
                title:data.title,
                idArticle: data._id
                })}>
                <Icon active name="md-checkmark-circle-outline" style={{ color: '#ffffff'}}/>
              </Button>
            }
            leftOpenValue={75}
            disableLeftSwipe={true}
            style={{ paddingLeft: 17 }}
          />
        </Content>
        <Menu navigate={navigate}/>
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

const mapStateToProps = (state) => {
  return {
    articles: state.articlesReducers.articles
  }
}

export default connect(mapStateToProps, null)(ReadingList)