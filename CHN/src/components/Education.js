import React from 'react';
import {
    View, 
    Text, 
    Image, 
    ScrollView, 
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import ChnContext from '../context/ChnContext';
import commonStyle from '../css/commonStyle';
import {apiCall, BaseUrl} from '../api/apiAction';
import MyText from './libs/MyText';
import Loader from './Loader';
const Education = (props)=> {
    const contextOption = React.useContext(ChnContext);
    const [isLoading, setLoading] = React.useState(false);
    const [isServer, setServer] = React.useState(true);
    const [sections, setSections] = React.useState([
        {
            categoryId: 1,
            category: "education.mentalHealth",
            imagePath: require("../images/mental-health.png"),
        },
        {
            categoryId: 2,
            category: "education.womenHealth",
            imagePath: require("../images/ob-gyn.png"),
        },
        {
            categoryId: 3,
            category: "education.childHealth",
            imagePath: require("../images/pedriatic.png"),
        },
        {
            categoryId: 4,
            category: "education.menHealth",
            imagePath: require("../images/mens-health.png"),
        },
        {
            categoryId: 5,
            category: "education.genWell",
            imagePath: require("../images/pedriatic.png"),
        },
    ])

    React.useEffect(()=> {
        setLoading(true);
        apiCall(`/categories-by-language/${contextOption.lang}`).then((res)=> {
            console.log({res});
           if (isServer) {
                setSections(res);
           }
            setLoading(false);
        }).catch((err)=> {
            console.log({err});
            setLoading(false);
            showInfoModal();
        })
    }, [contextOption.net]);

    const getSectionArticle = (sectionId) => {
        props.navigation.navigate("ArticleList", {sectionId});
    }

    const getSection = () => {
        if (sections.length == 0) {
            return (
                <View style={[UI.setPadding(2, 3, 2, 2, '%')]}>
                    <MyText title={Lang("education.noSection")} />
                </View>
            )
        }
        return (
            <View style={[commonStyle.row, commonStyle.wrap, commonStyle.center]}>
                {sections.map((item)=> 
                    <TouchableOpacity 
                        key={item.categoryId}
                        style={[
                            UI.setWidth(30, '%'),
                            commonStyle.mtmd,
                            commonStyle.vCenter,
                            UI.setPadding(2, 5, 2, 2, '%')
                        ]}
                        onPress={getSectionArticle.bind(this, item.categoryId)}
                    >
                        <Image
                            source={isServer ? {uri: BaseUrl + item.imagePath} : item.imagePath}
                            style={[
                                UI.setWidth(110), 
                                UI.setHeight(110),
                                commonStyle.imgContain,
                            ]}
                        />
                        <View style={[commonStyle.pt]}>
                            <Text 
                                style={[
                                    commonStyle.themeOrangeText, 
                                    commonStyle.textCenter,
                                    commonStyle.pl,
                                ]}
                                numberOfLines={2}
                            >
                                {isServer ? item.category : Lang(item.category)}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        )
    }

    return(
        <ChnContext.Consumer>
            {context => (
                <ScrollView style={[commonStyle.themeBg]}>
                    <View 
                        style={[
                            commonStyle.vCenter,
                            UI.setPadding(20,30,20,30)
                        ]}
                    >
                        <View style={[UI.setWidth(100, '%')]}>
                            <MyText
                                theme="heading"
                                title={Lang('education.title').toUpperCase()}
                            />
                        </View>
                    </View>
                    <Loader loading={isLoading} style={[commonStyle.pLg]}/>
                    <View style={[{paddingVertical: 20}]}>
                        <MyText
                            theme="orange"
                            title={Lang("education.section")}
                            style={[UI.setPaddingLeft(20), commonStyle.textBold]}
                        />
                        {getSection()}
                    </View>
                </ScrollView>
            )}
        </ChnContext.Consumer>
    )
}

export default Education;