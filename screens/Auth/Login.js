import React, {useState} from "react";
import styled from "styled-components";
import {TouchableWithoutFeedback, Keyboard} from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import {Alert} from "react-native";
import {useMutation} from "@apollo/react-hooks";
import {DO_LOGIN} from "./AuthQueries";
import {useLogIn} from "../../AuthContext";

const View = styled.View `
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default({navigation}) => {
    const emailInput = useInput(navigation.getParam("email", "happy0351@gmail.com"));
    const passwordInput = useInput("password");
    const logIn = useLogIn();
    const [loading, setLoading] = useState(false);
    const [doLoginMutation] = useMutation(DO_LOGIN, {
        variables: {
            email: emailInput.value,
            password: passwordInput.value
        }
    });
    const handleConfirm = async () => {
        const {value: email} = emailInput;
        const {value: password} = passwordInput;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(email)) {
            return Alert.alert("That email is invalid");
        }
        if(password===""){
            return Alert.alert("Please Input Your Password");
        }
        try {
            setLoading(true);
            const {data: {
                    doLogin
                }} = await doLoginMutation();
            if (doLogin !== "" || doLogin !== false) {
                logIn(doLogin);
            } else {
                Alert.alert("Wrong Value!! Check Your ID or Password!!");
            }
        } catch (e) {
            Alert.alert("Wrong Value!! Check Your ID or Password!!");
        } finally {
            setLoading(false);
        }
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <AuthInput
                    {...emailInput}
                    placeholder="Email"
                    keyboardType="email-address"
                    returnKeyType="send"
                    autoCorrect={false}/>
                <AuthInput
                    {...passwordInput}
                    placeholder="Secret"
                    returnKeyType="send"
                    onSubmitEditing={handleConfirm}
                    secureTextEntry={true}
                    autoCorrect={false}/>
                <AuthButton loading={loading} onPress={handleConfirm} text="LOG IN"/>
            </View>
        </TouchableWithoutFeedback>
    );
};