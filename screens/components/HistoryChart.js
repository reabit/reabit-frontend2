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

    let goodLength = this.props.summaries.filter(summary => {
      return summary.similarity === true
    }).length
    // console.log('good', goodLength)
    let badLength = this.props.summaries.filter(summary => {
      return summary.similarity === false
    }).length
    // console.log('bad', badLength)
    let goodPercentage = (goodLength / this.props.summaries.length) * 100
    // console.log('goodPercentage', goodPercentage)
    let badPercentage = (badLength / this.props.summaries.length) * 100
    // console.log('badPercentage', badPercentage)

    return (
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Text>Percentage Summary Articles</Text>
            </CardItem>
            <CardItem>
              <Body style={{ marginLeft: -40, marginTop: -30 }}>
                <VictoryPie
                  data={[
                    { x: "Good", y: goodPercentage },
                    { x: "Bad", y: badPercentage }
                  ]}
                  labelRadius={90}
                  style={{ 
                    labels: { 
                      fill: "white", 
                      fontSize: 20, 
                      fontWeight: "bold" 
                    } 
                  }}
                />
              </Body>
            </CardItem>
         </Card>
         <Card>
            <CardItem header>
              <Text>Graphic Articles</Text>
            </CardItem>
            <CardItem>
              <Body style={{ marginLeft: -20, marginTop: -30 }}>
              <VictoryChart
                theme={VictoryTheme.material}
                animate={{
                  duration: 2000,
                  onLoad: { duration: 1000 }
                }}
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