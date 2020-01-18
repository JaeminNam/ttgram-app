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
                elevation: 2, // remove shadow on Android
                shadowOpacity: 2, // remove shadow on iOS
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
                        top: 5,
                        left: -20
                    }}
                    resizeMode="contain"
                    source={require("../assets/logo.png")}/>
            ),
            headerLeft: (
                <NavIcon
                    type={"SimpleLineIcons"}
                    name={"camera"}
                    style={{
                        paddingLeft: 10
                    }}/>
            )
        }),
        navigationOptions: {
            tabBarIcon: ({focused}) => {return (!focused ? <NavIcon type={"MaterialCommunityIcons"} name={"home-outline"}/> : <NavIcon type={"MaterialCommunityIcons"} name={"home"} size={28} style={{top:0}}/>)}
        }
    },
    SEARCH: {
        screen: stackFactory(Search, {title: "Search"}),
        navigationOptions: {
            tabBarIcon: ({focused}) => {return (!focused ? <NavIcon type={"Ionicons"} name={"ios-search"} size={30}/> : <NavIcon type={"FontAwesome"} name={"search"} size={26} style={{top:-1}}/>)}
        }
    },
    UPLOAD: {
        screen: View,
        navigationOptions: {
            tabBarOnPress: ({navigation}) => {
                navigation.navigate("PhotoNavigation")
            },
            tabBarIcon: (<NavIcon type={"MaterialCommunityIcons"} name={"plus"} style={{borderRadius:8,borderWidth: 2,paddingLeft:4,paddingTop:3}} size={18}/>)
        }
    },
    NOTIFICATIONS: {
        screen: stackFactory(Notifications, {title: "Notifications"}),
        navigationOptions: {
            tabBarIcon: ({focused}) => {return (!focused ? <NavIcon type={"MaterialCommunityIcons"} name={"heart-outline"} /> : <NavIcon type={"MaterialCommunityIcons"} name={"heart"}/>)}
        }
    },
    PROFILE: {
        screen: stackFactory(Profile, {title: "Profile"}),
        navigationOptions: {
            tabBarIcon: ({focused}) => {return (!focused ? <NavIcon type={"Other"} name={"person-outline"}/> : <NavIcon type={"Other"} name={"person"}/>)}
        }
    }
}, {
    tabBarOptions: {
        showLabel: false
    }
});

export default Tabs;