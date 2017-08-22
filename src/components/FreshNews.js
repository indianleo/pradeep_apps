import React from 'react';
import {  
  Text, 
  View,
  TouchableOpacity, 
  ScrollView,
} from 'react-native';

import {
  ActionList,
} from './ThemeAction';
import Drawer         from 'react-native-drawer';
import theme from '../css/theme';
import {
  Button,
  ThemeModal,
  Menu,
  Navbar,
  Pic,
} from './';

var UI = ActionList();
var width = UI.width;
var height = UI.height;
var _this;
export default class FreshNews extends React.Component {

  constructor(){
    super();
    this.state ={
      menu : 0,
    };
    _this = this;
  }

  onMenuNavigation() {
    this.refs.drawer.open();
    this.setState({ menu : 0 });
  }

  openModal( data ){
    let msgData = {
        modalType : 'notification',
        ui        : true,
        children  : data,
    };

    this.refs.themeModal.show(msgData);
  }

  getNews(news, send = function(){}) {
    let newsContent = (
          <View
              style = {[
                  UI.setVpadding(20),
              ]}
          >
              <Text
                  style = {[ 
                      UI.setFont(24),
                  ]}
              >
                   {news.heading}
              </Text>
              <Text
                  style = {[
                      UI.setFont(18),
                  ]}
              >
                   {news.details}
              </Text>
          </View>
        );

      send(newsContent);
  }

  readNews(news){
    this.getNews(news,function(res) {
        _this.openModal(res);
    });
  }

  renderNews(){
    let newsItems = [];
    let i = 0;
    let FreshNews = UI.getNews();
    for(let key in FreshNews){
      let news = FreshNews[i];
      newsItems.push(
          <View
            key = {key+i}
            style = {[
                theme.center,
                theme.row,
                UI.setMarginAll(5),
                theme.borderInfo,
                theme.border1,
            ]}
          >
              <View
                  style = {[
                    UI.setHeight(100),
                    theme.center,
                    UI.setWidth(width*.35),
                  ]}
              >
                  <Pic
                        source = {require('../image/freshNews.jpg')}
                        height = {100}
                        width = {width*.35}
                    />
              </View>
              <TouchableOpacity
                  style = {[
                    UI.setHeight(100),
                    UI.setWidth(width*.6),
                    theme.center,
                  ]}

                  onPress = {()=>{ this.readNews(news) }}
              >
                  <Text>
                      {news.heading}
                  </Text>
                  <Text
                      numberOfLines = {1}
                  >
                      {news.details}
                  </Text>
              </TouchableOpacity> 
          </View>
      );
      i++;
    }

    return newsItems;
  }

  render(){
    var sidePane = <Menu />;
    return(
      <Drawer 
        ref = "drawer" 
        type = "overlay" 
        content = {sidePane} 
        tapToClose = {true} 
        openDrawerOffset = {0.2} 
        panCloseMask = {0.2} 
        closedDrawerOffset = {-3} 
        styles = {{ drawer: {backgroundColor:'white',borderColor:'#bbbbbb',borderWidth:1,shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3}}}
      >
        <Navbar
            title = {"Fresh News"}
            onMenuTouch = {this.onMenuNavigation.bind(this)}
          />

          <ScrollView
              style = {[
                UI.setHeight(height-75),
              ]}
          >
              <View
                style = {[
                    theme.center,
                    UI.setHeight(170),
                    UI.setWidth(width),
                    UI.setBg('pink'),
                ]}
              >
                  <Pic
                      source = {require('../image/news.jpg')}
                      height = {170}
                  />
              </View>

              {this.renderNews()}
          </ScrollView>
          <ThemeModal ref={"themeModal"} />
      </Drawer>
    );
  }
}