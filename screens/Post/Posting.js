import React, {useState} from "react";
import styled from "styled-components";
import {withNavigation} from "react-navigation";
import {TextInput, ScrollView} from "react-native-gesture-handler";
import constants from "../../constants";
import InputScrollView from 'react-native-input-scroll-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Platform, KeyboardAvoidingView} from "react-native";
import {Header} from 'react-navigation-stack';

const View = styled.View `
    height:${constants.height};
    width:${constants.width};
    margin-top:0;
`;

const Text = styled.Text ``;

const Posting = ({navigation}) => {
    return (

        <KeyboardAvoidingView keyboardVerticalOffset={81} extraScrollHeight={210}
        behavior={Platform.select({android: undefined, ios: 'padding'})}
        extraScrollHeight={210}
            style={{
                flex: 1
            }} behavior="padding">

                <TextInput
                    style={{
                        borderBottomWidth: 1
                    }}
                    multiline/>

        </KeyboardAvoidingView>
    )
};

export default withNavigation(Posting);