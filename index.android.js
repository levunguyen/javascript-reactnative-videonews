/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import styles from  './style';
import {
  AppRegistry,
  Text,
  View,
  StatusBar
} from 'react-native';

export default class AwesomeProject extends Component {

  render() {
    console.log("aaa"+JSON.stringify(styles.global));
    console.log("aaa"+JSON.stringify(styles.global.default.mainContainer));

    return (

      <View style={styles.global.default.mainContainer}>
        <View style={styles.navbar.default.appearence}>

            <Text style={styles.navbar.default.title}> iTunes Broswer </Text>
            <Text style={styles.navbar.default.button}>Search </Text>
        </View>

        <View style={styles.global.default.content}>
            <Text>Sample xfdsfsfsfsd</Text>

        </View>
      </View>
    );
  }
}


AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
