import React from "react";
import styled from "styled-components";
import {TouchableOpacity} from "react-native-gesture-handler";
import constants from "../../constants";
import AuthButton from "../../components/AuthButton";

const View = styled.View `
    justify-content:center;
    align-items:center;
    flex:1;
`;

const Image = styled.Image `
    width:${constants.width / 2};
`;

const Touchable = styled.TouchableOpacity `
`;
const SignUpBtn = styled.View `
    background-color:${props => props.theme.blueColor};
    padding: 10px;
    margin: 0px 50px;
    border-radius:8px;
    width: ${constants.width / 2};
`;
const SignUpBtnText = styled.Text `
    color:white;
    text-align:center;
    font-weight:600;
`;

const LoginLink = styled.View `
    margin-top:20px;
    width: 100px;
    height: 30px;
`;
const LoginLinkText = styled.Text `
    text-align:center;
    color:${props => props.theme.blueColor}; 
`;

export default({navigation}) => (
    <View>
        <Image resizeMode={"contain"} source={require("../../assets/logo.png")}></Image>
        <AuthButton text={"Create New Account"} onPress={() => navigation.navigate("Signup")}></AuthButton>
        <Touchable onPress={() => navigation.navigate("Login")}>
            <LoginLink>
                <LoginLinkText>Log in</LoginLinkText>
            </LoginLink>
        </Touchable>
    </View>
);