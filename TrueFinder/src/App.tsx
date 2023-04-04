import React from "react";      
import { View } from "react-native";
import { useSelector } from "react-redux";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from "./features/home/Home";
import Login from "./features/login/Login";
import VideoPlayer from "./features/videos/VideoPlayer";
import EditImage from "./features/edit/EditImage";

const Stack = createStackNavigator();
function App(): JSX.Element {
    const state = useSelector(newState => newState.login);

    React.useEffect(()=> {
        console.log(state)
    },[state]);

    const preStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={Login}
                />
            </Stack.Navigator>
        )
    }

    const postStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                />
                <Stack.Screen
                    name="VideoPlayer"
                    component={VideoPlayer}
                />
                <Stack.Screen
                    name="EditImage"
                    component={EditImage}
                />
            </Stack.Navigator>
        )
    }
    return (
        <NavigationContainer>
            {state.isLogined ? postStack() : preStack()}
        </NavigationContainer>
    )
}

export default App;