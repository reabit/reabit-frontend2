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
  Thumbnail,
  Header,
  Title,
  Right
} from 'native-base'
import { connect } from 'react-redux'
import ImageLoad from 'react-native-image-placeholder'

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
    console.log('ini apa', this.state.listViewData)
    const { navigate } = this.props.navigation
    return (
      <Container>
        <Header>
          <Body style={{ alignItems: 'center' }}>
            <Title>Reading List</Title>
          </Body>
        </Header>
        <Content style={styles.content}>
          <List
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <ListItem avatar 
                style={{
                  marginLeft: 2,
                  backgroundColor: (data.statusRead ? '#F5F5F5' : '#FFFFFF'),
                  paddingTop: 5,
                  borderBottomWidth: 0.5,
                  borderColor: '#C9C9C9'
                }}
              >
                <Left style={{ width: winSize.width / 6, paddingLeft: 17 }}>
                  <ImageLoad
                    style={{ width: 56, height: 56, borderRadius: 28 }}
                    loadingStyle={{ size: 'small', color: 'blue' }}
                    source={{ uri: data.img }}
                  />
                  {/* <Thumbnail 
                    loadingStyle={{ size: 'large', color: 'blue'}}
                    source={{ uri: data.img }}
                  /> */}
                </Left>
                <Body 
                  style={{
                    marginLeft: 3,
                    width: winSize.width / 2,
                    paddingLeft: 17,
                    paddingBottom: 17,
                    borderBottomWidth: 0
                  }}
                >
                  <Text 
                    style={{
                      textAlign: 'left',
                      marginRight: 0,
                      color: (data.statusRead ? '#757575' : '#000000')
                    }}
                    onPress={() => navigate('ArticleDetail', { id: data._id })}
                  >
                    {data.title.length > 60 ? data.title.substr(0, 60)+'...' : data.title }
                  </Text>
                  <Text note>{data.category}</Text>
                </Body>
                <Right>
                  {data.statusRead && <Icon name='md-checkmark-circle-outline' />}
                </Right>
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