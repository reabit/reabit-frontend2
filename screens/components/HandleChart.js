import React, { Component } from 'react'
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
  Thumbnail
} from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import {
  VictoryChart,
  VictoryTheme,
  VictoryLine
} from 'victory-native'
import { connect } from 'react-redux'

class HandleChart extends Component {

  render () {
    let data = []
    for (let index = 0; index <= 12; index++) {
      let lengthMonth = this.props.summaries.filter(summary => {
        let setDate = new Date(summary.date)
        let month = setDate.getMonth()
        return month == index
      })
      let monthData = {
        y: lengthMonth.length,
        x: index
      }
      data.push(monthData);
    }

    return (
      <Card style={{ marginRight: 17, marginLeft: 17}}>
        <CardItem header style={{ paddingBottom: 0, zIndex: 9999 }}>
          <Text style={{ fontWeight: 'bold'}}>
            Reading Summary
          </Text>
        </CardItem>
        <CardItem
          style={{
            paddingTop: 0,
            paddingBottom: 0,
            marginTop: -17,
            // marginBottom: -17,
            marginLeft: -17
          }}
        >
          <Body>
            <VictoryChart
              theme={VictoryTheme.material}
              // animate={{
              //   duration: 2000,
              //   onLoad: { duration: 1000 }
              // }}
              height={300}
              width={350}
            >
              <VictoryLine
                style={{
                  data: { stroke: "#66b3ff" },
                  parent: { border: "1px solid #ccc" }
                }}
                data={data}
              />
            </VictoryChart>
          </Body>
        </CardItem>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    summaries: state.summariesReducers.summaries
  }
}

export default connect(mapStateToProps, null)(HandleChart)