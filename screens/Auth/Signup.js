import React, {useState} from "react";
import styled from "styled-components";
import {TouchableWithoutFeedback, Keyboard} from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import {Alert} from "react-native";
import {useMutation} from "react-apollo-hooks";
import {CREATE_ACCOUNT} from "./AuthQueries";

const View = styled.View `
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default({navigation}) => {
    const firstNameInput = useInput("");
    const lastNameInput = useInput("");
    const emailInput = useInput(navigation.getParam("email", ""));
    const nickNameInput = useInput("");
    const passwordInput = useInput("");
    const [loading, setLoading] = useState(false);
    const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
        variables: {
            nickName: nickNameInput.value,
            email: emailInput.value,
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            password: passwordInput.value
        }
    });
    const handleSignup = async () => {
        const {value: firstName} = firstNameInput;
        const {value: lastName} = lastNameInput;
        const {value: email} = emailInput;
        const {value: nickName} = nickNameInput;
        const {value: password} = passwordInput;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (firstName === "") {
            return Alert.alert("Please Input Your FirstName.");
        }
        if (lastName === "") {
            return Alert.alert("Please Input Your LastName.");
        }
        if (!emailRegex.test(email)) {
            return Alert.alert("That email is invalid");
        }
        if (nickName === "") {
            return Alert.alert("Please Input Your NickName.");
        }
        if(password===""){
            return Alert.alert("Please Input Your Password");
        }
        try {
            setLoading(true);
            const {data: {
                    createAccount
                }} = await createAccountMutation();
            if (createAccount) {
                navigation.navigate("Secret", {email: email});
                return;
            } else {
                Alert.alert("re input");
            }
        } catch (e) {
            console.log(e);
            Alert.alert("Can't sign up now");
        } finally {
            setLoading(false);
        }
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <AuthInput {...firstNameInput} placeholder="First name" autoCorrect={false}/>
                <AuthInput {...lastNameInput} placeholder="Last name" autoCorrect={false}/>
                <AuthInput
                    {...emailInput}
                    placeholder="Email"
                    keyboardType="email-address"
                    returnKeyType="send"
                    autoCorrect={false}/>
                <AuthInput {...passwordInput} placeholder="Password" secureTextEntry={true}/>
                <AuthInput
                    {...nickNameInput}
                    placeholder="nickName"
                    keyboardType="default"
                    returnKeyType="send"
                    autoCorrect={false}/>
                <AuthButton loading={loading} onPress={handleSignup} text="Signup"/>
            </View>
        </TouchableWithoutFeedback>
    );
};