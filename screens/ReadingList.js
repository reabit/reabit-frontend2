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
  // Thumbnail,
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
      listViewData: this.props.articles.filter(article => {
        return article.statusSummary === false
      }),
      menuActive: {
        home: false,
        chat: false,
        read: true,
        history: false
      }
    }
  }

  static navigationOptions = {
    header: null
  }

  render() {
    const { navigate } = this.props.navigation
    const {
      container,
      header,
      centered,
      listItem,
      imagePosition,
      thumbnail,
      loading,
      listBody,
      listTitle,
      alignCenter,
      greenIcon,
      whiteIcon,
      backgroundGreen
    } = styles
    return (
      <Container style={container}>
        <Header style={header}>
          <Body style={centered}>
            <Title>Reading List</Title>
          </Body>
        </Header>
        <Content>
          <List
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <ListItem avatar 
                style={[listItem, {backgroundColor: (data.statusRead ? '#EEEEEE' : '#FFFFFF') }]}
              >
                <Left style={imagePosition}>
                  <ImageLoad style={thumbnail} loadingStyle={loading} source={{ uri: data.img }}/>
                </Left>
                <Body style={listBody}>
                  <Text 
                    style={[listTitle, { color: (data.statusRead ? '#757575' : '#000000') }]}
                    onPress={() => navigate('ArticleDetail', { id: data._id })}
                  >
                    {data.title.length > 60 ? data.title.substr(0, 60)+'...' : data.title }
                  </Text>
                  <Text note>{data.category}</Text>
                </Body>
                <Right style={alignCenter}>
                  {data.statusRead && <Icon name='md-checkmark-circle-outline' style={greenIcon}/>}
                </Right>
              </ListItem>
            }
            // ternary operator -------------------------------------------------------------------
            renderLeftHiddenRow={data =>
              data.statusRead ? 
              <Button
                full onPress={() => navigate('Chat', { title:data.title, idArticle: data._id })}
                style={backgroundGreen}
              >
                <Icon active name='ios-list-box-outline' style={whiteIcon}/>
              </Button> :
              <Button full onPress={() => navigate('ArticleDetail', { id: data._id })}>
                <Icon active name='ios-book-outline' style={whiteIcon}/>
              </Button>
            }
            // -----------------------------------------------------------------------------------
            leftOpenValue={75}
            disableLeftSwipe={true}
          />
        </Content>
        <Menu navigate={navigate} menuActive={this.state.menuActive}/>
      </Container>
    )
  }
}

const styles = {
  container: {
    backgroundColor: '#fff'
  },
  header: {
    backgroundColor: '#4060B8'
  },
  centered: {
    alignItems: 'center'
  },
  listItem: {
    marginLeft: 0,
    borderBottomWidth: 0.5,
    borderColor: '#C9C9C9'
  },
  imagePosition: {
    paddingLeft: 10
  },
  thumbnail: {
    width: 56,
    height: 56,
    marginTop: 10,
    marginBottom: 10
  },
  loading: {
    size: 'small',
    color: 'blue'
  },
  listBody: {
    marginLeft: 0,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0
  },
  listTitle: {
    textAlign: 'left',
    marginRight: 0
  },
  alignCenter: {
    justifyContent: 'center'
  },
  greenIcon: {
    color: '#00B42A',
    fontSize: 30
  },
  whiteIcon: {
    color: '#ffffff',
    fontSize: 30
  },
  backgroundGreen: {
    backgroundColor: '#00B42A'
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.articlesReducers.articles
  }
}

export default connect(mapStateToProps, null)(ReadingList)