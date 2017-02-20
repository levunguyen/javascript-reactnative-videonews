import React, { Component } from 'react';
import styles from  './style';
import NavigationBar from 'react-native-navbar';
import IntialScreen from './IntialScreen'
import {
  AppRegistry,
  Text,
  View,
  StatusBar,
  Navigator
} from 'react-native';


function renderScene(route, navigator) {
  return <route.component route={route} navigator={navigator} />;
}

export default class AwesomeProject extends Component {

  render() {
        const initialRoute = {
          component : IntialScreen
        }
        return (
            <View style={{ flex: 1, backgroundColor: '#ff9900', }}>
              <Navigator initialRoute={initialRoute} renderScene={renderScene}/>

            </View>
        );

  }
}


AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
