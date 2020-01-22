import React from "react";
import {createStackNavigator} from "react-navigation-stack";
import PhotoView from "../screens/Tabs/PhotoView";
import styles from '../styles';
import styled from "styled-components";
import NavIcon from '../components/NavIcon';


const Touchable = styled.TouchableOpacity ``;
const IconContainer = styled.View `
    padding-left:15px;
    padding-right:15px;
`;


export default createStackNavigator({
    PhotoView: {
        screen: PhotoView,
        navigationOptions: ({navigation}) => ({
            headerTransparent: true,
            headerStyle: {
                elevation: 0, // remove shadow on Android
                shadowOpacity: 0, // remove shadow on iOS
                borderBottomWidth: 0,
            },
            headerTitleStyle: {
                fontWeight: "normal",
                color: styles.themeColor,
                marginLeft: -10,
                textShadowColor: 'rgba(255, 255, 255, 1)',
                textShadowOffset: {width: 1, height: 1},
                textShadowRadius: 2
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
                                color: "#fff",
                            }}/>
                    </IconContainer>
                </Touchable>
            ),
            // headerBackTitle: ()=> null
        })
    },
}, {
});