import React, { Component } from 'react';
import NavigationBar from 'react-native-navbar';
import CustomScreen from './CustomScreen';
import styles from  './style';
import {
  View,
  ListView,
  Text,
  Image,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

import InfiniteScrollView from 'react-native-infinite-scroll-view';

export default class InitialScreen extends Component {

  constructor(props) {
    super(props);
    this.fetchData();
    this.state = {
      isLoading : true,
      dataSource : new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      canLoadMoreContent : true
    };
  };

  fetchData() {
    let REQUEST_URL = "http://espm-service.espm-supermedia.com/feed";
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        let feeds = responseData.filter((feed) => {
          if (feed.thumb) return feed;
        })
        this.setState({
          isLoading : false,
          dataSource : this.state.dataSource.cloneWithRows(feeds)

        });
      }).done();
  };

  loadMoreContentAsync = async () => {
   console.log("here");
   
 }

  genRows(pressData: {[key: number]: boolean}): Array<string> {
    let data = [];
    for (let ii=0; ii < 100; ii++) {
      data.push('Row' + ii);
    }
    return data;
  };
  renderRow(feed, sectionID: number, rowID: number, highlightRow : (sectionID: number, rowID: number) => void) {
    return (
      <TouchableHighlight onPress={() => {
          highlightRow(sectionID, rowID);
        }}>
        <View>
          <View style={styles.initview.row}>
            <Image style={styles.initview.thumb} source={{uri: feed.thumb}} />
            <View style={styles.initview.text}>
              <Text style={styles.initview.title}>{feed.source.name}</Text>
              <Text style={styles.initview.description}>{feed.description}</Text>
            </View>
          </View>
        </View>


      </TouchableHighlight>
    );
  }
  renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View
        style={styles.initview.sperator}
      />
    );
  };

  renderLoadingView() {
    return (
      <View style={styles.initview.loading}>
        <ActivityIndicator size='large'></ActivityIndicator>
        <Text>Loading...</Text>
      </View>
    )
  };



  render() {
    const rightButtonConfig = {
      title: 'Forward',
      handler: () => this.props.navigator.push({
        component: CustomScreen,
      }),
    };

    if(this.state.isLoading) {
      return this.renderLoadingView();
    };

    return (
      <ListView
             renderScrollComponent={props => <InfiniteScrollView {...props} />}
             dataSource={this.state.dataSource}
             renderRow={this.renderRow}
             canLoadMore={this.state.canLoadMoreContent}
             onLoadMoreAsync={this.loadMoreContentAsync}
           />
    );
  }
}
