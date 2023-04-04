import React from "react";
import { FlatList, Text, View } from "react-native";
import Video from 'react-native-video';
import videData from '../../config/videoUrl.json';
import css from "../../css";
import MyText from "../../libs/MyText";

const VideoPlayer = ({navigation, routes}) => {
    const videoRef = React.useRef();
    React.useEffect(()=> {
        //console.log(videData);
    }, [])
   
    const onBuffer = (e) => {
        console.log(e);
    }

    const onVideoError = (e)=> {
        console.log(e);
    }

    const renderHeader = () => {
        return(
            <View>
                <MyText
                    title="Video List"
                    style={[css.fs14, css.textLight]}
                />
            </View>
        )
    }

    const renderRow = ({item}) => {
        return (
            <View style={[css.setMargin(1,5,1,5,'%')]}>
                <MyText 
                    title={item.title}
                    style={[css.fs12]}
                />
                <Video 
                    source={{uri: item.url}}
                    ref={videoRef}                 
                    onBuffer={onBuffer}                
                    onError={onVideoError}              
                    style={[css.themeBorder, css.setHeight(100), css.setWidth(120)]} 
                    bufferConfig={{
                        minBufferMs: 15000,
                        maxBufferMs: 50000,
                        bufferForPlaybackMs: 2500,
                        bufferForPlaybackAfterRebufferMs: 5000
                      }}
                />
            </View>
        )
    }
    return (
        <FlatList
            data={videData}
            renderItem={renderRow}
            ListHeaderComponent={renderHeader}
            numColumns={2}
            style={[]}
        />
    )
}

export default VideoPlayer;