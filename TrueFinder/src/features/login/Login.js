import React from "react";
import {ScrollView, Text, View} from "react-native";
import { useDispatch } from "react-redux";
import css from "../../css";
import Input from "../../libs/Input";
import MyButton from "../../libs/MyButton";
import { setUser } from "./loginSlice";

const inputData = [
    {
        label: "Email",
        name: 'email',
        type: 'text',
        placeholder: "Enter email"
    },
    {
        label: "Passwod",
        placeholder: "Enter Password",
        name: 'password',
        type: 'text',
        extraProps: {secureTextEntry: true}
    }
]
const Login = () => {
    const dispatch = useDispatch();
    const [_form, setForm] = React.useState({});

    const handleInput = (input, value) => {
        setForm({..._form})
    }

    const onLogin = () => {
        console.log("login");
        dispatch(setUser({name: 'Pradeep Yadav', role: 'Admin'}))
    }

    return (
        <ScrollView>
            <View style={[css.setPadding(25, 'top')]}>
                {inputData.map((item) => (
                    <Input
                        key={item.label}
                        title={item.label}
                        placeholder={item.placeholder}
                        extraProps={item.extraProps}
                        onChange={handleInput}
                        data={_form}
                        name={item.name}
                        type={item.type}
                    />
                ))}
            </View>
            <View style={[css.setPadding(5,5,5,5,'%')]}>
                <MyButton
                    theme={true}
                    title="LOGIN"
                    style={[css.setWidth(100, '%'), css.setHeight(48), css.themeBg,css.center]}
                    onPress={onLogin}
                />
            </View>
        </ScrollView>
    )
}

export default Login;