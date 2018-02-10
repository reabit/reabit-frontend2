import React, { Component } from 'react'
import { View } from 'react-native'
import { 
  Container, 
  Header, 
  Content, 
  Card, 
  CardItem, 
  Text, 
  Body 
} from 'native-base'

import { VictoryPie, VictoryChart, VictoryTheme, VictoryLine, VictoryBar } from 'victory-native'

class GraficReading extends Component {
  
  render() {

    let data = []

    for (let index = 0; index <= 12; index++) {
      let mouthData = {
        y: Math.floor(Math.random()*12),
        x: index
      }
      data.push(mouthData);
    }

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
                    { x: "Good", y: 35 },
                    { x: "Bad", y: 40 }
                  ]}
                  labelRadius={90}
                  style={{ 
                    labels: { 
                      fill: "white", 
                      fontSize: 20, 
                      fontWeight: "bold" 
                    } 
                  }}
                  // width={10}
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

export default GraficReading