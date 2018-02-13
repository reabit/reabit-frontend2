import React, { Component } from 'react'
import {
  Grid,
  Row,
  Col,
  Text,
  Button,
  Icon,
  Card,
  CardItem,
  Body
} from 'native-base'

class HandleEmptyChart extends Component {
  render() {
    return (
      <Card style={{ marginRight: 17, marginLeft: 17 }}>
        <CardItem header style={{ paddingBottom: 0 }}>
          <Grid>
            <Row>
              <Col style={{ alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>Welcome,</Text>
                <Text>You don't have an article summary yet.</Text>
              </Col>
            </Row>
          </Grid>
        </CardItem>
        <CardItem>
          <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Row style={{ paddingTop: 17, paddingBottom: 17 }} >
              <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Button rounded block
                  onPress={() => this.props.navigate('Chat')}
                >
                  <Icon name='ios-play' />
                  <Text>Start Reading Now</Text>
                </Button>
              </Col>
            </Row>
          </Body>
        </CardItem>
      </Card>
    )
  }
}

export default HandleEmptyChart
