import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, ListItem } from 'native-base';
import NavigationBar from 'react-native-navbar';
import CustomScreen from './CustomScreen';
import styles from  './style';
import {
  View,
  ListView,
  Text,
  Image,
  TouchableHighlight,
  ActivityIndicator,
  AsyncStorage,
  DrawerLayoutAndroid
} from 'react-native';

import InfiniteScrollView from 'react-native-infinite-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import TimerMixin from 'react-timer-mixin';

export default class InitialScreen extends Component {

  constructor(props) {
    super(props);
    console.log("contructor is called");
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let feeds =[];
    this.state = {
      isLoading : true,
      dataSource: ds.cloneWithRows(feeds),
      canLoadMoreContent : true,
      feeds : feeds,
      feedPage : 0,
      visible: false
    }

  };

  componentWillMount() {
    console.log("component will mount ...");

  }

  componentDidMount() {
    console.log("component did mount ...");
    this.loadFeedsFirstTime();
  }

  componentWillUnmount() {
    console.log("component un mount ...");
  }

  loadFeedsFirstTime() {
    const API_URL = 'http://espm-service.espm-supermedia.com/feed/find';
    var data = {
      method : 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Origin': '',
         'Host': 'espm-service.espm-supermedia.com'
       },
       body: JSON.stringify({
         "where":{"status":0,"type":1},"limit":7,"sort":"points DESC"
       })
    };

    fetch(API_URL,data)
    .then((response) => response.json())
    .then((responseData) => {
        let feeds = responseData.filter((feed) => {
            return feed;
         })
         console.log("first time data :",feeds);
         this.setState({
           isLoading : false,
           dataSource: this.state.dataSource.cloneWithRows(feeds),
           feeds : feeds,
           feedPage : 1
         });
    })
    .done();

  }

  loadMoreContentAsync () {
    console.log("load more ...");
    /*TimerMixin.setTimeout(
      () => {
        this.setState({
          isLoading : true
        });
       },
      1000
    );*/

     const API_URL = 'http://espm-service.espm-supermedia.com/feed/find';
     let data = {
       method : 'POST',
       headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Origin': '',
          'Host': 'espm-service.espm-supermedia.com'
        },
        body: JSON.stringify({
          "where":{"type":1},"limit":7,"skip":this.state.feedPage*7,"sort":"points DESC"
        })
     };

     fetch(API_URL,data)
     .then((response) => response.json())
     .then((responseData) => {
       console.log("get feeds load more ...")
         let newfeeds = responseData.filter((feed) => {
             return feed;
          })
          let totalFeed = this.state.feeds.concat(newfeeds);
          /*this.setState({
            isLoading : false,
            dataSource: this.state.dataSource.cloneWithRows(totalFeed),
            feeds : totalFeed,
            feedPage : this.state.feedPage + 1
          });*/
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(totalFeed),
            feeds : totalFeed,
          });
     })
     .done();

  }

  renderRow(feed, sectionID: number, rowID: number, highlightRow : (sectionID: number, rowID: number) => void) {
    return (
      <TouchableHighlight onPress={() => {
          highlightRow(sectionID, rowID);
          this.props.navigator.push({
                name: 'CustomScreen', // Matches route.name
                passProps: {
                    name: feed
                }
            })
        }}>
        <View>
          <View style={styles.initview.row}>
            <Image style={styles.initview.thumb} source={{uri: feed.thumb}} />
            <View style={styles.initview.text}>
              <Text style={styles.initview.description}>{feed.title}</Text>
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

    if(this.state.isLoading) {
      return this.renderLoadingView();
    }
    return (
        <DrawerLayoutAndroid
          ref="drawer1"
          drawerWidth={300}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => this.showMenu()}>
            <Container>
              <Header>
                <Left>
                  <Button transparent onPress={()=>this.refs.drawer1.openDrawer()}>
                    <Icon name='menu' />
                  </Button>
                </Left>
                <Body>
                  <Title>Header</Title>
                </Body>
                <Right />
              </Header>
              <ListView
                 renderScrollComponent={props => <InfiniteScrollView {...props} />}
                 dataSource={this.state.dataSource}
                 renderRow={(this.renderRow.bind(this))}
                 canLoadMore={this.state.canLoadMoreContent}
                 onLoadMoreAsync={this.loadMoreContentAsync.bind(this)}
               />
            </Container>

        </DrawerLayoutAndroid>
    );

  }
  showMenu(){
    return(
      <Container>
        <Content>
          <ListItem>
            <Text style={{fontWeight:'bold'}}>Home</Text>
            <Icon name="home" style={{position:'absolute', right: 10, top: 10, color:'#0000CD'}}/>
          </ListItem>
          <ListItem>
            <Text style={{fontWeight:'bold'}}>Favourite</Text>
            <Icon name="heart" style={{position:'absolute', right: 10, top: 10, color:'#0000CD'}}/>
          </ListItem>
          <ListItem>
            <Text style={{fontWeight:'bold'}}>Help</Text>
            <Icon name="help" style={{position:'absolute', right: 10, top: 10, color:'#0000CD'}}/>
          </ListItem>
        </Content>
      </Container>
    )
  }
}
