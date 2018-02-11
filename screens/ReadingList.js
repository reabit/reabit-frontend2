import React, { Component } from 'react'
import { Dimensions, ListView } from 'react-native'
import {
  Container,
  Content,
  Button,
  Icon,
  Text,
  List,
  ListItem,
  Left,
  Body,
  Thumbnail
} from 'native-base'
import { connect } from 'react-redux'

import { Menu } from './components'

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
    header: null
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
                    onPress={() => navigate('ArticleDetail', { id: data._id })}
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