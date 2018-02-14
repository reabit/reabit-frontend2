import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'
import { 
  Container, 
  Content, 
  Spinner,
  List, 
  ListItem, 
  Button,
  Icon,
  Thumbnail, 
  Text, 
  Body,
  Left,
  Right
} from 'native-base';
import { connect } from 'react-redux'

const winSize = Dimensions.get('window')
class HistoryList extends Component {
  constructor(props) {
    super(props)
    this.state= {
      histories: this.props.summaries
    }
  }

  render() {
    const { container, greenIcon, redIcon, listItem, listBody, listTitle } = styles

    if (!this.state.histories) {
      return (
        <Container style={container}>
          <Content>
            <Spinner color='blue' />
          </Content>
        </Container>
      )
    } else {
      return (
        <Container style={container}>
          <Content>
            <List>
                {this.state.histories.map((history,idx) => {
                  let similarity = '';
                  if (history.similarity === true) {
                    similarity = <Icon name="ios-happy-outline" style={greenIcon}/>
                  } else {
                    similarity = <Icon name="ios-sad-outline" style={redIcon} />
                  }

                  let article = this.props.articles.filter(article => {
                    return article._id == history.idReading
                  })[0]
                  {console.log('article ------->', article)}

                  return (
                    <ListItem avatar style={listItem} key={idx}>
                      {similarity}
                      <Body style={listBody}>
                        <Text style={listTitle}>
                          {article.title.length > 60 ? article.title.substr(0, 60) + '...' : article.title}
                        </Text>
                        <Text note>{article.category}</Text>
                      </Body>
                    </ListItem>
                    )
                  }
                )
              }
            </List>
          </Content>
        </Container>
      )
    }
  }
}

const styles = {
  container: {
    backgroundColor: '#fff'
  },
  greenIcon: {
    fontSize: 42,
    color: 'green',
    paddingLeft: 17
  },
  redIcon: { 
    fontSize: 42, 
    color: 'red',
    paddingLeft: 17 
  },
  listItem: {
    marginLeft: 2,
    paddingTop: 5,
    borderBottomWidth: 0.5,
    borderColor: '#C9C9C9'
  },
  listBody: {
    paddingLeft: 17,
    paddingBottom: 17,
    borderBottomWidth: 0
  },
  listTitle: {
    textAlign: 'left',
    marginRight: 0
  }
}

const mapStateToProps = (state) => {
  return {
    summaries: state.summariesReducers.summaries,
    articles: state.articlesReducers.articles
  }
}

export default connect(mapStateToProps, null)(HistoryList)