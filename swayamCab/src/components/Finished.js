import React from 'react';
import { View, Text, VirtualizedList} from 'react-native';
import { getItem, getItemCount, getTableRef } from '../config/myConfig';
import MyContext from '../context/MyContext';
import commonStyle from '../css/commonStyle';
import Loader from '../libs/Loader';

const Finished = () => {
    const [list, setList] = React.useState([]);
    const [isLoading, setLoading] = React.useState(true);
    const contextOption = React.useContext(MyContext);
    const record = {};

    React.useEffect(()=> {
        getTableRef(`/users/${contextOption.userId}`).once('value').then((res)=> {
            let tempData = res.val();
            getTableRef(`/booking`).once('value').then((bookingRes)=> {
                getBookings(bookingRes.val(), tempData);
            })
        }).catch((err)=> {
            console.log(err);
        })
    }, []);

    const getBookings = (data, userData) => {
        let arr = [];
        console.log(userData.history);
        let ids = Object.values(userData.history || {});
        ids.map((history)=> {
            let found = data[history.bookingId]
            if ( found && found.status == "Completed" && !record[found.id]) {
                record[found.id] = "added";
                arr.push(found);
            }
        })
        setList(arr);
        setLoading(false);
    }

    const renderItem = ({item}) => {
        return (
            <View style={[commonStyle.bgWhite, commonStyle.mb, commonStyle.pMd, commonStyle.br, ]}>
                <View style={[commonStyle.row]}>
                    <View style={[commonStyle.pbMd, commonStyle.flex1]}>
                        <Text style={[commonStyle.themeOrangeText]}>
                            Rider
                        </Text>
                        <Text style={[commonStyle.textDark]}>
                            {item.rider}
                        </Text>
                    </View>
                    <View style={[commonStyle.pbMd, commonStyle.flex1]}>
                        <Text style={[commonStyle.themeOrangeText]}>
                            Driver: 
                        </Text>
                        <Text style={[commonStyle.textDark]}>
                            {item.driver || "N/A"}
                        </Text>
                    </View>
                </View>
                <View style={[commonStyle.row]}>
                    <View style={[commonStyle.pbMd, commonStyle.flex1]}>
                        <Text style={[commonStyle.themeOrangeText]}>
                            Distance
                        </Text>
                        <Text style={[commonStyle.textDark]}>
                            {item.distance}
                        </Text>
                    </View>
                    <View style={[commonStyle.pbMd, commonStyle.flex1]}>
                        <Text style={[commonStyle.themeOrangeText]}>
                            Fare
                        </Text>
                        <Text style={[commonStyle.textDark]}>
                            {item.fare}
                        </Text>
                    </View>
                </View>
                <View style={[commonStyle.row, commonStyle.pb]}>
                    <View style={[commonStyle.pbMd, commonStyle.flex1]}>
                        <Text style={[commonStyle.themeOrangeText]}>
                            Pickup
                        </Text>
                        <Text style={[commonStyle.textDark]}>
                            {item?.from?.description}
                        </Text>
                    </View>
                    <View style={[commonStyle.pbMd, commonStyle.flex1]}>
                        <Text style={[commonStyle.themeOrangeText]}>
                            Destination
                        </Text>
                        <Text style={[commonStyle.textDark]}>
                            {item?.to?.description || "Not found"}
                        </Text>
                    </View>
                </View>
                <View style={[commonStyle.pt, UI.setBorderTop(1, '#b3cce6')]}>
                    <Text style={[commonStyle.textCenter, commonStyle.textOffSky]}>{item.onDate}</Text>
                </View>
            </View>
        )
    }
    const renderHeader = () => {
        return (
            <View style={[commonStyle.center, commonStyle.pMd]}>
                <Text style={[commonStyle.themeHeadingText]}>
                    {list.length > 0 ? "Finished Bookings" : "Such Ride not Found"}
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

export default Finished;