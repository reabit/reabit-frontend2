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
    if (!this.state.histories) {
      return (
        <Container>
          <Content>
            <Spinner color='blue' />
          </Content>
        </Container>
      )
    } else {
      return (
        <Container>
          <Content>
            <List>
                { this.state.histories.map((history,idx) => {
                  let similarity = '';
                  if (history.similarity === true) {
                    similarity = <Icon name="ios-happy-outline" 
                                    style={{
                                      fontSize: 42,
                                      color: 'green',
                                      paddingLeft: 17
                                    }} 
                                  />
                  } else {
                    similarity = <Icon name="ios-sad-outline" style={{ fontSize: 42, color: 'red', paddingLeft: 17 }} />
                  }
                return (
                  <ListItem avatar
                    style={{
                      marginLeft: 2,
                      paddingTop: 5,
                      borderBottomWidth: 0.5,
                      borderColor: '#C9C9C9'
                    }}
                    key={idx}
                  >
                    {similarity}
                    <Body
                      style={{
                        paddingLeft: 17,
                        paddingBottom: 17,
                        borderBottomWidth: 0
                      }}
                      >
                      <Text
                        style={{
                          textAlign: 'left',
                          marginRight: 0
                        }}
                        // onPress={() => navigate('ArticleDetail', { id: history.idReading._id })}
                      >
                        {history.idReading.title.length > 60 ? history.idReading.title.substr(0, 60) + '...' : history.idReading.title}
                      </Text>
                      <Right>

                      </Right>
                      <Text note>{history.idReading.category}</Text>
                    </Body>
                  </ListItem>
                      // <ListItem key={idx}>
                      //   <Thumbnail square size={80} source={{ uri: history.idReading.img }} />
                      //   <Body>
                      //     <Text>{ (history.idReading.title.length > 30 ? history.idReading.title.substr(0, 30)+'...' : history.idReading.title) }</Text>
                      //   </Body>
                      //   <View style={styles.buttonView}>
                      //       <Button small danger vertical
                      //       style={styles.button}>
                      //       { similarity }
                      //       </Button>
                      //       {/* <Button small success vertical 
                      //       style={styles.button}
                      //       >
                      //         <Icon name="ios-book-outline" />

                      //       </Button> */}
                      //   </View>
                      // </ListItem>
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
  },
  text: {
    padding: 2.5
  }
}

const mapStateToProps = (state) => {
  return {
    summaries: state.summariesReducers.summaries
  }
}

export default connect(mapStateToProps, null)(HistoryList)