import React from 'react';
import { VirtualizedList, View, Text, Image, Pressable } from "react-native";
import { apiCall } from '../api/apiAction';
import { getItem, getItemCount } from '../config/chnConfig';
import ChnContext from "../context/ChnContext";
import commonStyle from '../css/commonStyle';
import MyText from './libs/MyText';
import Loader from './Loader';

const HealthRecordInfo = (props) => {
    let _param = props.route.params;
    const [isLoading, setLoading] =  React.useState(true);
    const [_data, setData] = React.useState([]);
    const [underDev, setDev] = React.useState(false);
    const notAllowed = ["pid", "myMoodId", "action", "is_device", "type"]

    React.useEffect(()=> {
        if (_param.apiName) {
            apiCall(_param.apiName).then((res)=> {
                if (UI.isValid(res) && res.status != false) {
                    setData(filterRes(res, _param.prefix));
                } else {
                    showInfoModal(Lang("healthRecords.noData"));
                }
                setLoading(false);
            }).catch((err)=> {
                console.log(err);
                setLoading(false);
                showInfoModal();
            })
        } else {
            setDev(true);
        }
    }, []);

    const filterRes = (data, prefix="") => {
        const tempArr = [];
        if (Array.isArray(data)) {
            data?.map((item, index)=> {
                item.id = prefix + index;
                tempArr.push(item);
            })
        } else {
            for (const key in data) {
                tempArr.push({[key]: data[key] ? Object.entries(data[key]) : []})
            }
        }
        return tempArr;
    }

    const handleAction = (item) => {
        console.log(item);
    }

    const renderHeader = (item) => {
        return (
            <View style={[UI.setPadding(0,5,5,5, '%')]}>
                <View 
                    style={[
                        commonStyle.vCenter, 
                        commonStyle.row, 
                        commonStyle.alignCorner,
                    ]}
                >
                    <View style={[UI.setWidth(70, '%')]}>
                        <Text 
                            style={[
                                commonStyle.themeHeadingText, 
                            ]}
                        >
                            {Lang(_param.text)}
                        </Text>
                    </View>
                    <Image
                        source={require('../images/1024x/record.png')}
                        style={[commonStyle.pageIcons]}
                    />
                </View>
                <Loader loading={isLoading} />
            </View>
        );
    }

    const getDivider = () => {
        return (
            <View style={[UI.setHeight(2)]}>
                <View style={[UI.setBg("#ccc")]} />
            </View>
        )
    }

    const getInnerRow = (label, value) => {
        const valueData = [];
        if (Array.isArray(value)) {
            value.filter((list, index)=> {
                if (!notAllowed.includes(list[0]) && !list[0].endsWith("Id")) {
                    valueData.push(
                        <View
                            key={label + "_" + index}
                            style={[commonStyle.plMd]}
                        >
                            <MyText 
                                title={"* " + list[0]}
                                nestedTitle={": " + (list[1] || "N/A" )}
                            />
                        </View>
                    )
                }
            })
        } else {
            valueData.push(
                <Text
                    key={label+"_innerId"}
                    style={[
                        commonStyle.themeText,
                        commonStyle.textDark,
                        UI.setFont(16)
                    ]}
                >
                    {value || "N/A"}
                </Text>
            )
        }
        
        return (
            <View 
                key={label}
                style={[
                    commonStyle.pMd,
                ]}
            >
                <Text
                    style={[
                        commonStyle.themeOrangeText,
                        UI.setFont(18),
                    ]}
                >
                    {label.toUpperCase()}:
                </Text>
                {valueData}
            </View>
        )
    }

    const  renderListItem = ({ item }) => {
        const innerData = [];
        for (let key in item) {
            if (key !== "id") {
                innerData.push(getInnerRow(key, item[key]))
            }
        }
        return(
            <View style={[UI.setPadding(0,5,0,5, '%')]}>
                <Pressable 
                    style={[
                        commonStyle.bgWhite,
                        commonStyle.pLg,
                        commonStyle.br,
                        UI.setWidth(100, '%'),
                    ]} 
                    onPress={handleAction.bind(this, item)}
                >
                    {innerData}
                </Pressable>
            </View>
        )
    }

    return (
        <ChnContext.Consumer>
            {context=>
                <View style={[commonStyle.themeBg]}>
                    {underDev
                        ? 
                            <View style={[commonStyle.center, commonStyle.vPadLg]}>
                                <Text style={[commonStyle.themeHeadingText]}>
                                    {Lang("app 212.underDev")}
                                </Text>
                            </View>
                        :
                            <VirtualizedList
                                data={_data}
                                keyExtractor={item => item.id}
                                ListHeaderComponent={renderHeader}
                                renderItem={renderListItem}
                                ItemSeparatorComponent={getDivider}
                                getItemCount={getItemCount}
                                getItem={getItem}
                                style={[UI.setMarginTop(10), UI.setPadding(20,10,20,10)]}
                            />
                    }
                </View>
            }
        </ChnContext.Consumer>
    )
}

export default HealthRecordInfo;