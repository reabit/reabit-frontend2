import PropTypes from 'prop-types';
import React from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Right, Icon } from 'native-base';


export default class CustomView extends React.Component {
  render() {
    // console.log('asaoskoaskas', this.props.currentMessage)
    if (this.props.currentMessage.text === 'Alright') {
      return (
        <Container
          style={{width: 300}}
        >
          <Content>
            <List>
              <ListItem
                style={{marginLeft: 15, marginRight: 15, paddingRight: 0}}
              >
                <Body
                  style={{width: 250}}
                >
                  <Text style={{marginLeft: 0, marginRight: 0}} >Sankhadeep</Text>
                  <Text style={{marginLeft: 0, marginRight: 0}} note>Its time to build a difference . . .</Text>
                </Body>
                <Right>
                  <Icon name="add-circle" style={{fontSize: 24, color: 'green'}}/>

                </Right>
              </ListItem>
              <ListItem
                style={{marginLeft: 15, marginRight: 15, paddingRight: 0}}
              >
                <Body
                  style={{width: 250}}
                >
                  <Text style={{marginLeft: 0, marginRight: 0}} >Sankhadeep</Text>
                  <Text style={{marginLeft: 0, marginRight: 0}} note>Its time to build a difference . . .</Text>
                </Body>
                <Right>
                  <Icon name="add-circle" style={{fontSize: 24, color: 'green'}}/>

                </Right>
              </ListItem>
              <ListItem
                style={{marginLeft: 15, marginRight: 15, paddingRight: 0}}
              >
                <Body
                  style={{width: 250}}
                >
                  <Text style={{marginLeft: 0, marginRight: 0}} >Sankhadeep</Text>
                  <Text style={{marginLeft: 0, marginRight: 0}} note>Its time to build a difference . . .</Text>
                </Body>
                <Right>
                  <Icon name="add-circle" style={{fontSize: 24, color: 'green'}}/>

                </Right>
              </ListItem>
              <ListItem
                style={{marginLeft: 15, marginRight: 15, paddingRight: 0}}
              >
                <Body
                  style={{width: 250}}
                >
                  <Text style={{marginLeft: 0, marginRight: 0}} >Sankhadeep</Text>
                  <Text style={{marginLeft: 0, marginRight: 0}} note>Its time to build a difference . . .</Text>
                </Body>
                <Right>
                  <Icon name="add-circle" style={{fontSize: 24, color: 'green'}}/>

                </Right>
              </ListItem>
              <ListItem
                style={{marginLeft: 15, marginRight: 15, paddingRight: 0}}
              >
                <Body
                  style={{width: 250}}
                >
                  <Text style={{marginLeft: 0, marginRight: 0}} >Sankhadeep</Text>
                  <Text style={{marginLeft: 0, marginRight: 0}} note>Its time to build a difference . . .</Text>
                </Body>
                <Right>
                  <Icon name="add-circle" style={{fontSize: 24, color: 'green'}}/>

                </Right>
              </ListItem>
              <ListItem
                style={{marginLeft: 15, marginRight: 15, paddingRight: 0}}
              >
                <Body
                  style={{width: 250}}
                >
                  <Text style={{marginLeft: 0, marginRight: 0}} >Sankhadeep</Text>
                  <Text style={{marginLeft: 0, marginRight: 0}} note>Its time to build a difference . . .</Text>
                </Body>
                <Right>
                  <Icon name="add-circle" style={{fontSize: 24, color: 'green'}}/>

                </Right>
              </ListItem>
              <ListItem
                style={{marginLeft: 15, marginRight: 15, paddingRight: 0}}
              >
                <Body
                  style={{width: 250}}
                >
                  <Text style={{marginLeft: 0, marginRight: 0}} >Sankhadeep</Text>
                  <Text style={{marginLeft: 0, marginRight: 0}} note>Its time to build a difference . . .</Text>
                </Body>
                <Right>
                  <Icon name="add-circle" style={{fontSize: 24, color: 'green'}}/>

                </Right>
              </ListItem>
              <ListItem
                style={{marginLeft: 15, marginRight: 15, paddingRight: 0}}
              >
                <Body
                  style={{width: 250}}
                >
                  <Text style={{marginLeft: 0, marginRight: 0}} >Sankhadeep</Text>
                  <Text style={{marginLeft: 0, marginRight: 0}} note>Its time to build a difference . . .</Text>
                </Body>
                <Right>
                  <Icon name="add-circle" style={{fontSize: 24, color: 'green'}}/>

                </Right>
              </ListItem>
              <ListItem
                style={{marginLeft: 15, marginRight: 15, paddingRight: 0}}
              >
                <Body
                  style={{width: 250}}
                >
                  <Text style={{marginLeft: 0, marginRight: 0}} >Sankhadeep</Text>
                  <Text style={{marginLeft: 0, marginRight: 0}} note>Its time to build a difference . . .</Text>
                </Body>
                <Right>
                  <Icon name="add-circle" style={{fontSize: 24, color: 'green'}}/>

                </Right>
              </ListItem>
              <ListItem
                style={{marginLeft: 15, marginRight: 15, paddingRight: 0}}
              >
                <Body
                  style={{width: 250}}
                >
                  <Text style={{marginLeft: 0, marginRight: 0}} >Sankhadeep</Text>
                  <Text style={{marginLeft: 0, marginRight: 0}} note>Its time to build a difference . . .</Text>
                </Body>
                <Right>
                  <Icon name="add-circle" style={{fontSize: 24, color: 'green'}}/>

                </Right>
              </ListItem>
            </List>
          </Content>
        </Container>
      );
    }
    return null;
  }
}
