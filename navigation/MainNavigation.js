import {createAppContainer, NavigationActions, StackActions} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import { fromRight } from "react-navigation-transitions";
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";
import MessageNavigation from "./MessageNavigation";
const MainNavigation = createStackNavigator({
    TabNavigation,
    PhotoNavigation,
    MessageNavigation
}, {
    headerMode: "none",
    mode: "modal",
    transitionConfig: () => fromRight()
});

export default createAppContainer(MainNavigation);