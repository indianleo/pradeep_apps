import React from 'react'
import { TouchableOpacity, View, Text, Image, VirtualizedList } from 'react-native'
import { apiCall, BaseUrl } from '../api/apiAction'
import commonStyle from '../css/commonStyle'
import MyText from './libs/MyText'
import Loader from './Loader'
import {decode} from 'html-entities';
import { getItem, getItemCount } from '../config/chnConfig'

const ArticleList = (props)=> {
    const [isLoading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);

    React.useEffect(()=> {
        let _param = props.route?.params || {};
        apiCall(`/articles?categoryId=${_param.sectionId}`).then((res)=> {
            if (res.status == false) {
                console.log(res);
            } else {
                setData([...res]);
            }
            setLoading(false);
        }).catch((err)=> {
            setLoading(false);
            showInfoModal();
        })
    }, []);

    const openArticle = (item) => {
        props.navigation.navigate("ArticleInfo", item);
    }

    const filterContent = (str) => {
        if (str) {
            str = str.replace( /(<([^>]+)>)/ig, '').split("&#10;").join(" ");
        }
        return decode(str);
    }

    const renderHeaderRow = () => {
        return (
            <View style={[UI.setPadding(3,3,3,3, '%')]}>
                <MyText
                    title={Lang("education.article")}
                    style={[
                        commonStyle.textLight, 
                        commonStyle.textBlue,
                        commonStyle.subHeading,
                    ]}
                />
            </View>
        )
    }

    const renderEmpty = () => {
        return(
            <View style={[UI.setPadding(3,3,3,3, '%')]}>
                <View
                    style={[
                        commonStyle.pMd,
                        commonStyle.bgWhite,
                        commonStyle.br,
                        commonStyle.mbmd
                    ]}
                >
                    <MyText
                        title={Lang("education.emptyArticle")}
                        style={[
                            commonStyle.textLightBold, 
                            commonStyle.themeNormalText,
                        ]}
                    />
                </View>
            </View>
        )
    }

    const loadArticleList = ({item}) => {
        return(
            <View style={[UI.setPadding(3,3,3,3, '%')]}>
                <TouchableOpacity 
                    style={[
                        commonStyle.pMd,
                        commonStyle.bgWhite,
                        commonStyle.br,
                        commonStyle.mbmd
                    ]}
                    onPress={openArticle.bind(this, item)}
                >
                    <View style={[commonStyle.pbMd]}>
                        <MyText
                            theme="orange"
                            title= {item.title}
                            style={[commonStyle.textLight, commonStyle.themeText]}
                        />
                    </View>
                    <View style={[commonStyle.row]}>
                        <Image
                            source={{uri: BaseUrl + item.imagePath}}
                            style={[UI.setScreen(120,100), commonStyle.orangeBorder]}
                        />
                        <View style={[UI.setPadding(0,10,3,3),UI.setWidth(68, '%')]}>
                            <Text numberOfLines={6}>
                                {filterContent(item.content)}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View>
            {isLoading 
                ? <Loader loading={true} style={[commonStyle.pLg]} /> 
                : 
                    <VirtualizedList
                        data={data}
                        renderItem={loadArticleList}
                        keyExtractor={(item)=> item.articleId}
                        ListHeaderComponent={renderHeaderRow}
                        ListEmptyComponent={renderEmpty}
                        getItem={getItem}
                        getItemCount={getItemCount}
                    />
            }
        </View>
    )
}

export default ArticleList;