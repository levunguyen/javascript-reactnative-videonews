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

import TimerMixin from 'react-timer-mixin';
import RefreshInfiniteListView from '@remobile/react-native-refresh-infinite-listview';

export default class InitialScreen extends Component {

  constructor(props) {
    super(props);
    this.fetchData();
    this.state = {
      isLoading : true,
      dataSource : new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
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

  onRefresh() {
        this.fetchData;
      /*  this.setTimeout(()=>{
            this.list.hideHeader();
        }, 1000); */
  };

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


  onInfinite() {
          this.fetchData();
        this.setTimeout(()=>{
            this.list.hideFooter();

        }, 1000);
  };
  loadedAllData() {
      return this.data.index >= this.data.maxIndex||this.data.index===0;
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
  /*    <View style={{ flex: 1, backgroundColor: '#ff9900', }}>
        <NavigationBar
          title={{ title: 'Title', }}
          rightButton={rightButtonConfig} />
      /*  <ListView
          dataSource={this.state.dataSource}
          renderRow={(this.renderRow.bind(this))}
          renderSeparator={this.renderSeparator}
        /> */

        <View style={{flex:1}}>
                <View style={{height:20}} />
                <RefreshInfiniteListView
                    ref = {(list) => {this.list= list}}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSeparator={this.renderSeparator}
                    loadedAllData={this.loadedAllData}
                    initialListSize={30}
                    scrollEventThrottle={10}
                    style={{backgroundColor:'transparent'/*,top:100, left:10, width:200, height:300, position:'absolute'*/}}
                    onRefresh = {this.onRefresh}
                    onInfinite = {this.onInfinite}
                    >
                </RefreshInfiniteListView>
        </View>

    /*  </View>*/
    );
  }
}
