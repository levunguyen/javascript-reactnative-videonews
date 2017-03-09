import React, { Component } from 'react';
import NavigationBar from 'react-native-navbar';
import styles from  './style';
import {
  Text,
  View,
  AsyncStorage,
  Button
} from 'react-native';


export default class CustomScreen extends Component {
  constructor(props) {
        super(props);
        console.log("CustomScreen contructor ", this.props.feedId);
        this.state = {
          favouriteList: []
        }
    }

  _saveDataLocal = async (feed) => {
    console.log('Function add to my favourite list ...');
    var myFavourite = await AsyncStorage.getItem("favouriteList");
    if(myFavourite === null) {
      await AsyncStorage.setItem("favouriteList", JSON.stringify(feed));
      var afterAdded = await AsyncStorage.getItem("favouriteList");
      console.log("Add first feed to my favourite: ", afterAdded);
    } else {
      await AsyncStorage.mergeItem("favouriteList", JSON.stringify(feed));
      var afterAdded = await AsyncStorage.getItem("favouriteList");
      console.log("Add one more feed to my favourite: ", afterAdded);
    }
  }

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
        <Text>{this.props.name.title}</Text>
        <View style={styles.initview.button}>
          <Button
            onPress={() => {this._saveDataLocal(this.props.name)}}
            title="Add to Favourite"
          />
        </View>

      </View>
    );
  }
}
