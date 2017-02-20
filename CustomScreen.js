import React, { Component } from 'react';
import NavigationBar from 'react-native-navbar';
import {
  Text,
  View
} from 'react-native';


export default class CustomScreen extends Component {
  render() {
    const leftButtonConfig = {
      title: 'Back',
      handler: () => this.props.navigator.pop(),
    };

    return (
      <View style={{ flex: 1, backgroundColor: '#9999CC', }}>
        <NavigationBar
          title={{ title: 'Custom screen', }}
          leftButton={leftButtonConfig} />
      </View>
    );
  }
}
