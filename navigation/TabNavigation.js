import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from "react-navigation-stack";
import Home from "../screens/Home";
import Friends from "../screens/Tabs/Friends";
import Notifications from "../screens/Tabs/Notifications";
import React from "react";
import NavIcon from '../components/NavIcon';
import MessagesLink from '../components/MessagesLink';
import styles from '../styles';
import Messages from '../screens/Tabs/Messages';
import Detail from '../screens/Detail';
import UserDetail from '../screens/UserDetail';
import styled from "styled-components";

const Touchable = styled.TouchableOpacity ``;
const IconContainer = styled.View `
    padding-left:15px;
    padding-right:15px;
`;

const stackFactory = (initialRoute, customConfig) => createStackNavigator({
    InitialRoute: {
        screen: initialRoute,
        navigationOptions: {
            headerStyle: {
                elevation: 1, // remove shadow on Android
                shadowOpacity: 1, // remove shadow on iOS
            },
            headerTitleStyle: {
                fontSize: 30,
                fontWeight: "normal",
                color: styles.fontThemeColor
            },
            ...customConfig
        }
    },
    Detail: {
        screen: Detail,
        navigationOptions: {
            title: "Photo",
            headerStyle: {
                elevation: 0, // remove shadow on Android
                shadowOpacity: 0, // remove shadow on iOS
            },
            headerTitleStyle: {
                fontSize: 30,
                fontWeight: "normal",
                color: styles.fontThemeColor
            }
        }
    },
    UserDetail: {
        screen: UserDetail,
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
});

const Tabs = createBottomTabNavigator({
    HOME: {
        screen: stackFactory(Home, {
            headerRight: <MessagesLink/>,
            // headerLeft: <LogoIcon/>
        }),
        navigationOptions: {
            title: "FEED",
            tabBarIcon: ({focused}) => {
                return (
                        !focused
                        ? <NavIcon
                            type={"AntDesign"}
                            name={"bars"}
                            style={{
                                color: styles.lightThemeColor
                            }}/>
                        : <NavIcon
                            type={"AntDesign"}
                            name={"bars"}
                            style={{
                                color: styles.themeColor
                            }}/>
                    )
            }
        }
    },
    FRIENDS: {
        screen: stackFactory(Friends, {
            headerRight: <MessagesLink/>,
            // headerLeft: <LogoIcon/>
        }),
        navigationOptions: {
            tabBarIcon: ({focused}) => {
                return (
                        !focused
                        ? <NavIcon
                            type={"AntDesign"}
                            name={"team"}
                            style={{
                                color: styles.lightThemeColor
                            }}/>
                        : <NavIcon
                            type={"AntDesign"}
                            name={"team"}
                            style={{
                                color: styles.themeColor
                            }}/>
                    )
            }
        }
    },
    MESSAGES: {
        screen: stackFactory(Messages, {title: "Messages"}),
        navigationOptions: {
            tabBarIcon: ({focused}) => {
                return (
                        !focused
                        ? <NavIcon
                            type={"AntDesign"}
                            name={"message1"}
                            style={{
                                color: styles.lightThemeColor
                            }}/>
                        : <NavIcon
                            type={"AntDesign"}
                            name={"message1"}
                            style={{
                                color: styles.themeColor
                            }}/>
                    )
            }
        }
    },
    NOTIFICATIONS: {
        screen: stackFactory(Notifications, {title: "Notifications"}),
        navigationOptions: {
            tabBarIcon: ({focused}) => {
                return (
                        !focused
                        ? <NavIcon
                            type={"AntDesign"}
                            name={"notification"}
                            style={{
                                color: styles.lightThemeColor
                            }}/>
                        : <NavIcon
                            type={"AntDesign"}
                            name={"notification"}
                            style={{
                                color: styles.themeColor
                            }}/>
                    )
            }
        }
    },
    PROFILE: {
        screen: stackFactory(UserDetail, {
            title: "Profile",
            header:null
        }),
        navigationOptions: {
            tabBarIcon: ({focused}) => {
                return (
                        !focused
                        ? <NavIcon
                            type={"AntDesign"}
                            name={"user"}
                            style={{
                                color: styles.lightThemeColor
                            }}/>
                        : <NavIcon
                            type={"AntDesign"}
                            name={"user"}
                            style={{
                                color: styles.themeColor
                            }}/>
                    )
            }
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: styles.themeColor,
        inactiveTintColor: styles.darkGreyColor,
        labelStyle: {
            top: -2,
            marginBottom: 3
        },
        tabStyle: {
            marginTop: 3
        }
    }
});

export default Tabs;