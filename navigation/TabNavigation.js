import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import {createStackNavigator} from "react-navigation-stack";
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import {View, Text} from "react-native";
import React from "react";
import MessagesLink from "../components/MessagesLink";
const stackFactory = (initialRoute, customConfig) => createStackNavigator({
    InitialRoute: {
        screen:initialRoute,
        navigationOptions: { ...customConfig }
    }
});

export default createBottomTabNavigator({
    HOME: {
        screen: stackFactory(Home,{
            title:"Home"
            ,headerRight: <MessagesLink />
        })
    },
    SEARCH: {
        screen: stackFactory(Search,{
            title:"Search"
        })
    },
    UPLOAD: {
        screen: View,
        navigationOptions: {
            tabBarOnPress: ({navigation}) => {
                navigation.navigate("PhotoNavigation")
            }
        }
    },
    NOTIFICATIONS: {
        screen: stackFactory(Notifications,{
            title:"Notifications"
        })
    },
    PROFILE: {
        screen: stackFactory(Profile,{
            title:"Profile"
        })
    }
});