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
import HTMLView from 'react-native-htmlview';
import {
  Button,
  ThemeModal,
  Menu,
  AdminMenu,
  Navbar,
  Pic,
  Loader
} from './';

var UI = ActionList();
var width = UI.width;
var height = UI.height;
var _this;
export default class Entertainments extends React.Component {

  constructor(){
    super();
    this.state ={
      menu : 0,
    };
    _this = this;
    FreshNews = {};
  }

  componentWillMount(){
    this.send();
  }

  onMenuNavigation() {
    this.refs.drawer.open();
    this.setState({ menu : 0, load : false });
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
          <ScrollView
              style = {[
                  UI.setScreen(width,height),
              ]}
          > 
              {
                (news.news_pic == "")
                  ?
                    <Pic
                        source = {require('../image/freshNews.jpg')}
                        height = {300}
                        width = {width}
                    />
                  :
                    <Pic
                        uri = {news.news_pic.startsWith("native_image") ? UI.server + news.news_pic : news.news_pic}
                        height = {300}
                        width = {width}
                    />
              }
              <HTMLView
                  style = {[ 
                      UI.setFont(24),
                      UI.setPaddingAll(10),
                  ]}
                  value={news.news_title}
              />
              <HTMLView
                    style = {[
                        UI.setFont(18),
                        UI.setPaddingAll(10),
                    ]}
                    value={news.news_info}
              />
          </ScrollView>
        );

      send(newsContent);
  }

  readNews(news){
    this.getNews(news,function(res) {
        _this.openModal(res);
    });
  }

  send(){
    let data = {
      table : "app_news",
      cat   : "entertainment",
      action : "load_news",
    };

    let call = new XMLHttpRequest();
    call.onreadystatechange = function()
    {
      if(call.readyState==4 && call.status==200)
      {
         FreshNews = JSON.parse(call.responseText);
         _this.setState({ load : true }); 
      }
      else
      {
          
      }
    }
    call.open( "GET", UI.server + "action.php?data=" + JSON.stringify(data), true );
    call.send(); 
  }

  renderNews(){
    let newsItems = [];
    let i = 0;
    for(let key in FreshNews){
      let news = FreshNews[key];
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
                  {
                    (news.news_pic == "")
                      ?
                        <Pic
                            source = {require('../image/freshNews.jpg')}
                            height = {100}
                            width = {width*.35}
                        />
                      :
                        <Pic
                            uri = {news.news_pic.startsWith("native_image") ? UI.server + news.news_pic : news.news_pic}
                            height = {100}
                            width = {width*.35}
                        />
                  }
              </View>
              <TouchableOpacity
                  style = {[
                    UI.setHeight(100),
                    UI.setWidth(width*.6),
                    theme.hCenter,
                    UI.setPaddingLeft(10)
                  ]}

                  onPress = {()=>{ this.readNews(news) }}
              >
                  <HTMLView
                        style = {[
                            UI.setFont(24),
                            theme.textDanger,
                            UI.setWidth(width*.55),
                        ]}
                        value={news.news_title}
                    />
                  <HTMLView
                    value={news.news_info}
                  />
              </TouchableOpacity> 
          </View>
      );
      i++;
    }

    return newsItems;
  }

  render(){
    const sidePane = ( this.props.user == "admin" ? <AdminMenu /> : <Menu  user={this.props.user} userEmail = {this.props.userEmail} /> );
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
            title = {"Entertainments"}
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

              { 
                this.state.load
                  ?
                    this.renderNews()
                  : 
                    <View
                        style = {[ UI.setScreen(width,height-200),theme.center,]}
                    >
                        <Text style = {[ UI.setFont(18) ]} >Loading News...</Text>
                    </View>
               }
          </ScrollView>
          <ThemeModal ref={"themeModal"} />
      </Drawer>
    );
  }
}