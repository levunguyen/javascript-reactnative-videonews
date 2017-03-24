import React, { Component } from 'react';
import styles from  './style';
import NavigationBar from 'react-native-navbar';
import IntialScreen from './IntialScreen';
import CustomScreen from './CustomScreen';
import {
  AppRegistry,
  Text,
  View,
  StatusBar,
  Navigator
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';



export default class AwesomeProject extends Component {

  renderScene(route, navigator) {
     if(route.name == 'IntialScreen') {
       return <IntialScreen navigator={navigator} {...route.passProps} />
     }
     if(route.name == 'CustomScreen') {
       return <CustomScreen navigator={navigator} {...route.passProps} />
     }
  }

  render() {
        const initialRoute = {
          component : IntialScreen
        }
        return (
            <Container style={{ flex: 1, backgroundColor: '#ff9900', }}>
              <Navigator initialRoute={{name:'IntialScreen'}} renderScene={this.renderScene} />

            </Container>
        );

  }
}


AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
