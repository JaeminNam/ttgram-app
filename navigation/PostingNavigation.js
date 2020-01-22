import React from "react";
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import Posting from "../screens/Post/Posting";
import styled from "styled-components";
import NavIcon from '../components/NavIcon';
import styles from '../styles';

const Touchable = styled.TouchableOpacity ``;
const IconContainer = styled.View `
    padding-left:15px;
    padding-right:15px;
`;

export default createStackNavigator({
    Posting: {
        screen: Posting,
        navigationOptions : ({navigation}) => ({
            title:"Posting",
            headerTitleStyle:{
                color:styles.deptThemeColor},
            headerStyle: {
                elevation: 1, // remove shadow on Android
                shadowOpacity: 1, // remove shadow on iOS
            },
            headerLeft: () => (
                <Touchable
                    onPress={() => {
                        navigation.goBack(null)
                    }}>
                    <IconContainer>
                        <NavIcon
                            type={"Ionicons"}
                            name={"ios-arrow-back"}
                            size={30}
                            style={{
                                color: styles.deptThemeColor,
                            }}/>
                    </IconContainer>
                </Touchable>
            ),
            headerRight: () => (
                <Touchable
                    onPress={() => {
                        navigation.goBack(null)
                    }}>
                    <IconContainer>
                        <NavIcon
                        type={"AntDesign"}
                        name={"form"}
                        color={styles.deptThemeColor}
                        size={27}/>
                    </IconContainer>
                </Touchable>
            )
        })
    }
}, {
});