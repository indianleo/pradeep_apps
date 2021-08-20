import React from 'react';
import { View, Text, VirtualizedList} from 'react-native';
import { getItem, getItemCount, getTableRef } from '../config/myConfig';
import MyContext from '../context/MyContext';
import commonStyle from '../css/commonStyle';
import Loader from '../libs/Loader';

const Canceled = () => {
    const [list, setList] = React.useState([]);
    const [isLoading, setLoading] = React.useState(true);
    const contextOption = React.useContext(MyContext);
    let checkFlag = "CanceledByRider";

    React.useEffect(()=> {
        getTableRef(`/users/${contextOption.userId}`).once('value').then((res)=> {
            let tempData = res.val();
            if (tempData.role == "driver") checkFlag = "CanceledByDriver";
            if (UI.isValid(tempData.history)) {
                getTableRef(`/booking`).orderByChild(tempData.role).equalTo(contextOption.userId).once('value').then((bookingRes)=> {
                    getBookings(bookingRes.val(), tempData);
                }).catch((err)=> {
                    console.log(err);
                })
            } else {
                setLoading(false);
            }
        }).catch((err)=> {
            console.log(err);
        })
    }, []);

    const getBookings = (data, userData) => {
        let arr = [];
        let ids = Object.values(userData.history);
        ids.map((history)=> {
            let found = data[history.bookingId]
            if ( found && found.status == checkFlag) {
                arr.push(found);
            }
        })
        setList(arr);
        setLoading(false);
    }

    const renderItem = ({item}) => {
        return (
            <View style={[commonStyle.bgWhite, commonStyle.mb, commonStyle.pMd, commonStyle.br, ]}>
                <View style={[commonStyle.pbMd, UI.setBorderBottom(1, '#ccc')]}>
                    <Text style={[commonStyle.themeOrangeText]}>
                        {Lang("pendingReq.bookId")}: 
                        <Text style={[commonStyle.themeNormalText, commonStyle.textDark]}>
                            {" "+item.id}
                        </Text>
                    </Text>
                </View>
                <View style={[commonStyle.row, commonStyle.ptMd]}>
                    <View style={[commonStyle.pbMd, commonStyle.flex1]}>
                        <Text style={[commonStyle.themeOrangeText]}>
                            {Lang("pendingReq.rider")}:
                        </Text>
                        <Text style={[commonStyle.textDark]}>
                            {item.rider}
                        </Text>
                    </View>
                    <View style={[commonStyle.pbMd, commonStyle.flex1]}>
                        <Text style={[commonStyle.themeOrangeText]}>
                            {Lang("pendingReq.driver")}: 
                        </Text>
                        <Text style={[commonStyle.textDark]}>
                            {item.driver || "N/A"}
                        </Text>
                    </View>
                </View>
                <View style={[commonStyle.row]}>
                    <View style={[commonStyle.pbMd, commonStyle.flex1]}>
                        <Text style={[commonStyle.themeOrangeText]}>
                            {Lang("pendingReq.distance")}:
                        </Text>
                        <Text style={[commonStyle.textDark]}>
                            {item.distance}
                        </Text>
                    </View>
                    <View style={[commonStyle.pbMd, commonStyle.flex1]}>
                        <Text style={[commonStyle.themeOrangeText]}>
                            {Lang("pendingReq.fare")}:
                        </Text>
                        <Text style={[commonStyle.textDark]}>
                            {item.fare}
                        </Text>
                    </View>
                </View>
                <View style={[commonStyle.row, commonStyle.pb]}>
                    <View style={[commonStyle.pbMd, commonStyle.flex1]}>
                        <Text style={[commonStyle.themeOrangeText]}>
                            {Lang("pendingReq.pickup")}:
                        </Text>
                        <Text style={[commonStyle.textDark]}>
                            {item?.from?.description}
                        </Text>
                    </View>
                    <View style={[commonStyle.pbMd, commonStyle.flex1]}>
                        <Text style={[commonStyle.themeOrangeText]}>
                        {Lang("pendingReq.destination")}:
                        </Text>
                        <Text style={[commonStyle.textDark]}>
                            {item?.to?.description || Lang("pendingReq.notFound")}
                        </Text>
                    </View>
                </View>
                <View style={[commonStyle.pt, UI.setBorderTop(1, '#b3cce6')]}>
                    <Text style={[commonStyle.textCenter, commonStyle.textOffSky]}>
                        {item.onDate}
                    </Text>
                </View>
            </View>
        )
    }

    const renderHeader = () => {
        return (
            <View style={[commonStyle.center, commonStyle.pMd]}>
                <Text style={[commonStyle.themeHeadingText]}>
                    {list.length > 0 ? Lang("cancel.cancelBook") : Lang("cancel.notFound")}
                </Text>
            </View>
        )
    }
    return(
        <MyContext.Consumer>
            {context =>
                <View style={[UI.setPadding(5,5,5,5, '%')]}>
                    <Loader loading={isLoading} stylee={[commonStyle.pLg]}/>
                    <VirtualizedList
                        data={list}
                        renderItem={renderItem}
                        ListHeaderComponent={renderHeader}
                        keyExtractor={(item)=> item.id}
                        getItem={getItem}
                        getItemCount={getItemCount}
                    />
                </View>
            }
        </MyContext.Consumer>
    )
}

export default Canceled;