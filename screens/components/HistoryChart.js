import React, { Component } from 'react'
import { 
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body
} from 'native-base'
import {
  VictoryPie,
  VictoryChart,
  VictoryTheme,
  VictoryLine
} from 'victory-native'
import { connect } from 'react-redux'

class HistoryChart extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    // console.log('summaries graphic', this.props.summaries)
    let data = []
    for (let index = 0; index <= 12; index++) {
      let lengthMonth = this.props.summaries.filter(summary => {
        let setDate = new Date(summary.date)
        let month = setDate.getMonth()
        return month == index
      })
      let mouthData = {
        y: lengthMonth.length,
        x: index
      }
      data.push(mouthData);
    }
    // console.log(this.props.summaries)
    let goodLength = this.props.summaries.filter(summary => {
      return summary.similarity == 'true'
    }).length
    // console.log('good', goodLength)
    let badLength = this.props.summaries.filter(summary => {
      return summary.similarity == 'false'
    }).length
    // console.log('bad', badLength)
    let goodPercentage = (goodLength / this.props.summaries.length) * 100
    // console.log('goodPercentage', goodPercentage)
    let badPercentage = (badLength / this.props.summaries.length) * 100
    // console.log('badPercentage', badPercentage)

    return (
      <Container>
        <Content>
          <Card style={{ marginRight: 17, marginLeft: 17 }}>
            <CardItem header style={{ paddingBottom: 0, zIndex: 9999 }}>
              <Text>Summaries</Text>
            </CardItem>
            <CardItem
              style={{
                paddingTop: 0,
                paddingBottom: 0,
                marginTop: -21,
                marginBottom: -21,
                marginLeft: -21
              }}
            >
              <Body>
                <VictoryPie
                  data={[
                    { x: null, y: goodPercentage },
                    { x: null, y: badPercentage }
                  ]}
                  labelRadius={60}
                  style={{ 
                    labels: { 
                      fill: "white", 
                      fontSize: 14, 
                      fontWeight: "bold" 
                    }
                  }}
                  colorScale={["#00B42A", "#E10000"]}
                  height={330}
                  width={330}
                />
              </Body>
            </CardItem>
            <CardItem style={{ paddingTop: 0, paddingBottom: 17, zIndex: 9999 }}>
              <Text note>Red: Bad, </Text>
              <Text note>Green: Good</Text>
            </CardItem>
          </Card>
          <Card style={{ marginRight: 17, marginLeft: 17 }}>
            <CardItem header style={{ paddingBottom: 0, zIndex: 9999 }}>
              <Text>Reading</Text>
            </CardItem>
            <CardItem
              style={{
                paddingTop: 0,
                paddingBottom: 0,
                marginTop: -17,
                marginBottom: -17
              }}
            >
              <Body>
                <VictoryChart
                  height={300}
                  theme={VictoryTheme.material}
                  height={315}
                  width={335}
                >
                  <VictoryLine
                    style={{
                      data: { stroke: "#66b3ff" },
                      parent: { border: "1px solid #ccc"}
                    }}
                    data={data}
                  />
                </VictoryChart>
              </Body>
            </CardItem>
         </Card>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    summaries: state.summariesReducers.summaries
  }
}

export default connect(mapStateToProps, null)(HistoryChart)