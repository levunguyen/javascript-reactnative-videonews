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

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let feeds = [
     'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin',
     'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin',
     'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin',
     'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin',
    ];
    this.state = {
      dataSource: ds.cloneWithRows(feeds),
      canLoadMoreContent : true,
      feeds : feeds
    }
  };

  loadMoreContentAsync = async () => {
     let additionFeeds =  [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'
     ];
     let newfeed = this.state.feeds.concat(additionFeeds);
     console.log("new feed " , newfeed);
     this.setState({
       dataSource: this.state.dataSource.cloneWithRows(newfeed),
       feeds : newfeed
     });

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

    if(this.state.feeds.length > 50) {
      this.setState({
        canLoadMoreContent : false
      });
    }

    return (
      <ListView
             renderScrollComponent={props => <InfiniteScrollView {...props} />}
             dataSource={this.state.dataSource}
             renderRow={(rowData) => <Text>{rowData}</Text>}
             canLoadMore={this.state.canLoadMoreContent}
             onLoadMoreAsync={this.loadMoreContentAsync}
           />
    );
  }
}
