import React, { Component } from 'react'
import { View } from 'react-native'
import {
  Container,
  Content,
  Icon,
  H2,
  Text,
  Left,
  Body,
  Right,
  Card,
  CardItem,
  Thumbnail,
  Button
} from 'native-base'

class HandleEmptyChart extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Button rounded
          style={{alignItems: 'center'}}
          onPress={() => this.props.navigate('Chat')}
        >
          <Icon name='ios-play'/>
          <Text>Start Reading Now</Text>
        </Button>
      </View>
    )
  }
}

export default HandleEmptyChart