import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";

const View = styled.View`
    justify-content:center;
    align-items:center;
    flex:1;
`;

const Text = styled.Text``;

export default ({navigation}) => (
    <View>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text>LOG IN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text>SIGNUP</Text>
        </TouchableOpacity>
    </View>
);