import React, { Component } from 'react'
import { Grid, Row, Col, Spinner } from 'native-base'

export default class ScreenLoading extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 300 }}>
            <Spinner color='blue' />
          </Col>
        </Row>
      </Grid>
    )
  }
}