import React from "react";
import styled from "styled-components";
import {withNavigation} from "react-navigation";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import constants from "../../constants";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import InputView from 'rn-autoheight-input'

const View = styled.View`
    height:${constants.height};
    width:${constants.width};
    margin-top:0;
`;

const Text = styled.Text``;

const Posting = ({navigation}) => {
    
    return (
        <ScrollView>
        <View >
        <TextInput style={{width: constants.width, fontSize:18, padding:20, borderBottomWidth:0.5}}
        multiline={true}
        underlineColorAndroid='rgba(0,0,0,0)'
        autoCorrect={false}
        textAlignVertical="top">
        동해물과 백두산이 마르고 닳도록
        ここで勉強している人どれぐらいいますか？
        This is how it appears after adding some text.
        </TextInput>
        </View>
        </ScrollView>)
};

export default withNavigation(Posting);