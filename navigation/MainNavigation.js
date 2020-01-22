import {createAppContainer, NavigationActions, StackActions} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";
import PhotoViewNavigation from "./PhotoViewNavigation";
import { fadeIn } from "react-navigation-transitions";
import PostingNavigation from "./PostingNavigation";

const MainNavigation = createStackNavigator({
    TabNavigation,
    PhotoNavigation,
    PhotoViewNavigation,
    PostingNavigation
}, {
    headerMode: "none",
    mode: "modal",
    transitionConfig: () => fadeIn()
});

export default createAppContainer(MainNavigation);