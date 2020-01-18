import React from "react";
import {useIsLoggedIn} from "../AuthContext";
import AuthNavigation from "../navigation/AuthNavigation";
import MainNavigation from "../navigation/MainNavigation";
import { AsyncStorage } from "react-native";

export default() => {
    const isLoggedIn = useIsLoggedIn();
    // const isLoggedIn = false;
    return isLoggedIn
        ? <MainNavigation/>
        : <AuthNavigation/>
}
