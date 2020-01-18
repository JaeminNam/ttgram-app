import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from "react-navigation-stack";
import Home from "../screens/Home";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import {View, Platform, Image} from "react-native";
import React from "react";
import NavIcon from '../components/NavIcon';
import MessagesLink from '../components/MessagesLink';
import styles from '../styles';

const stackFactory = (initialRoute, customConfig) => createStackNavigator({
    InitialRoute: {
        screen: initialRoute,
        navigationOptions: {
            headerStyle: {
                elevation: 0, // remove shadow on Android
                shadowOpacity: 0, // remove shadow on iOS
            },
            headerTitleStyle:{
                fontSize:30,
                fontWeight:"bold",
                color:styles.deptThemeColor                
            },
            ...customConfig
        }
    }
});

const Tabs = createBottomTabNavigator({
    HOME: {
        screen: stackFactory(Home, {
            headerRight: <MessagesLink/>,
            headerTitle: (
                <Image
                    style={{
                        width: 120,
                        top: 5
                    }}
                    resizeMode="contain"
                    source={require("../assets/logo.png")}/>
            )
            // ,
            // headerLeft: (
            //     <NavIcon
            //         type={"SimpleLineIcons"}
            //         name={"camera"}
            //         style={{
            //             paddingLeft: 10
            //         }}/>
            // )
        }),
        navigationOptions: {
            tabBarIcon: ({focused}) => {return (!focused ? <NavIcon type={"AntDesign"} name={"home"}/> : <NavIcon type={"AntDesign"} name={"home"} style={{color:styles.themeColor}}/>)}
        }
    },
    SEARCH: {
        screen: stackFactory(Search, {title: "Search"}),
        navigationOptions: {
            tabBarIcon: ({focused}) => {return (!focused ? <NavIcon type={"AntDesign"} name={"search1"}/> : <NavIcon type={"AntDesign"} name={"search1"} style={{color:styles.themeColor}}/>)}
        }
    },
    UPLOAD: {
        screen: View,
        navigationOptions: {
            tabBarOnPress: ({navigation}) => {
                navigation.navigate("PhotoNavigation")
            },
            tabBarLabel: () => null,
            tabBarIcon: (<NavIcon type={"AntDesign"} name={"pluscircle"} size={55} style={{top:-5, color:styles.themeColor}}/>)
        }
    },
    NOTIFICATIONS: {
        screen: stackFactory(Notifications, {title: "Notifications"}),
        navigationOptions: {
            tabBarIcon: ({focused}) => {return (!focused ? <NavIcon type={"AntDesign"} name={"hearto"} /> : <NavIcon type={"AntDesign"} name={"hearto"} style={{color:styles.themeColor}}/>)}
        }
    },
    PROFILE: {
        screen: stackFactory(Profile, {title: "Profile"}),
        navigationOptions: {
            tabBarIcon: ({focused}) => {return (!focused ? <NavIcon type={"AntDesign"} name={"user"} /> : <NavIcon type={"AntDesign"} name={"user"} style={{color:styles.themeColor}}/>)}
        }
    }
}, {
    tabBarOptions: {
    }
});

export default Tabs;