import React, {useState} from 'react';
import {Image, ScrollView, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MyContext from '../context/MyContext';
import commonStyle from '../css/commonStyle';

const ImageSlider = (props)=> {
    const [activeSlide, updateSlide] = useState();
    
    const changeImage = ({nativeEvent})=> {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (props.hideOnSlide && slide == props.hideOnSlide) {
            props.onSkip?.();
        } else if (slide !== activeSlide) {
            updateSlide(slide);
        }
    }

    const renderheader = (isPortrait)=> {
        if (props.logo) {
            return(
                <View 
                    style={[
                        style.logoContainer, 
                        UI.setLeft(5, '%'),
                        UI.setTop(isPortrait ? 0 : -20, '%')
                    ]}
                >
                    <Image 
                        source={props.logo}
                        style={[
                            props.logoHeight && props.logoWidth
                                ? UI.setScreen(props.logoWidth, props.logoHeight) 
                                : style.logo
                        ]}
                    />
                </View>
            )
        }
        return null;
    }

    return (
        <MyContext.Consumer>
            {context =>
                <View style={[UI.setPadding(2,2,1,2, '%'), commonStyle.bgWhite]}>
                    {renderheader(context.portrait)}
                    <ScrollView
                        pagingEnabled={true}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={[
                            UI.setWidth(), 
                            UI.setHeight(100, '%'),
                        ]}
                        onScroll={changeImage}
                    >
                        {props.data.map((item, index)=>
                            <View 
                                key={index} 
                                style={[ 
                                    UI.setWidth(), 
                                    commonStyle.wrap,
                                    commonStyle.alignAround
                                ]}
                            >
                                <View 
                                    style={[
                                        UI.setWidth(), 
                                        commonStyle.plMd,
                                    ]}
                                >
                                    <Text 
                                        style={[
                                            commonStyle.themeHeadingText,
                                            UI.setWidth(90, '%')
                                        ]}
                                    >
                                        {item.info}
                                    </Text>
                                    <Text 
                                        style={[
                                            UI.setPaddingBottom(10),
                                            commonStyle.themeSkyText,
                                            UI.setWidth(90, '%')
                                        ]}
                                    >
                                        {item.subText}
                                    </Text>
                                </View>
                                <Image
                                    source={props.uri ? {uri: item.src} : item.src}
                                    style={[
                                        UI.setWidth(100, '%'), 
                                        UI.setHeight(50, '%'), 
                                        commonStyle.imgCover,
                                    ]}
                                />
                            </View>
                        )}
                    </ScrollView>
                    <View style={style.pagination}>
                            {
                            props.data.map((v,i)=> 
                                    <Text
                                        key={i}
                                        style={ i == activeSlide ? style.paginationTextActive : style.paginationText}
                                    >
                                        &#9679;
                                    </Text>
                            )}
                            <TouchableOpacity 
                                style={[UI.setRight(-100), commonStyle.absolute]} 
                                onPress={props.onSkip}
                            >
                                <Text 
                                    style={[
                                        commonStyle.textDark, 
                                        commonStyle.textBold, 
                                        commonStyle.textStyle,
                                        commonStyle.fs4
                                    ]}
                                >
                                    {Lang("slider.skip")}
                                </Text>
                            </TouchableOpacity>
                    </View>
                </View>
            }
        </MyContext.Consumer>
    )
}

const style = StyleSheet.create({
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 15,
        alignSelf: 'center',
    },
    paginationText: {
        color: '#888',
        margin: 3,
    },
    paginationTextActive: {
        color: 'cyan',
        margin: 3,
    },
    logo: {
        height: 80,
        width: 80,
    },
    logoContainer: {
        position:'absolute',
        zIndex: 99,
    },
});

export default ImageSlider;