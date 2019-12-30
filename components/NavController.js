import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useIsLoggedIn, useLogIn, useLogOut } from "../AutoContext";
import AuthNavigation from "../navigation/AuthNavigation";
import MainNavigation from "../navigation/MainNavigation";

export default () => {
    const isLoggedIn = useIsLoggedIn();
    return (
        <View style={{flex:1}}>
          {isLoggedIn ? (
            <MainNavigation/>
          ) : (
            <AuthNavigation/>
          )}
        </View>
    )
}

