import React from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import ChnContext from '../context/ChnContext';
import commonStyle from '../css/commonStyle';
import HTMLView from 'react-native-htmlview';
import { BaseUrl } from '../api/apiAction';
import { WebView } from 'react-native-webview';
import ErrorZone from './libs/ErrorZone';

const ArticleInfo = (props) => {
    const info = props.route.params;
    const [loading, setLoading] = React.useState(true);
    const [isError, setError] = React.useState(false);

    const getContent = (content) => {
        return `
            <html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body {
                            font-family:'Roboto'
                        }
                        a {
                            pointer-events: none
                        }
                    </style>
                </head>
                <body>
                    ${content}
                </body>
            </html>`
    }

    if (isError) {
        return (<ErrorZone />)
    }
    return (
        <ChnContext.Consumer>
            {context =>
                <ScrollView>
                    <View>
                        <Image
                            source={{uri: BaseUrl + info.imagePath}}
                            style={[
                                UI.setWidth(100, '%'), 
                                UI.setHeight(200),
                                commonStyle.imgCover
                            ]}
                        />
                    </View>
                    <View>
                        <Text
                            style={[
                                commonStyle.orangeFontSize, 
                                commonStyle.textOrange, 
                                commonStyle.textLight,
                                commonStyle.textStyle,
                                UI.setPadding(20,15,10,15)
                            ]}
                        >
                            {info.title}
                        </Text>
                    </View>
                    <View style={[UI.setHpadding(15)]}>
                        <WebView
                            //originWhitelist={['*']}
                            source={{html: getContent(info.content)}}
                            style={[ !loading && UI.setHeight(UI.height()/2), commonStyle.noBg]}
                            startInLoadingState={true}
                            onLoadEnd={()=> setLoading(false)}
                            onError={()=> setError(true)}
                            renderLoading={() => <ActivityIndicator size="large" color="#0000ff" style={[commonStyle.pLg]}/>}
                            scalesPageToFit={UI.ios ? false : true}

                        />
                    </View>
                </ScrollView>
            }
        </ChnContext.Consumer>
    )
}

export default ArticleInfo;