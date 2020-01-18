import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import {createStackNavigator} from 'react-navigation-stack';
import { fromRight } from "react-navigation-transitions";
import styles from '../styles';

const PhotoTabs = createMaterialTopTabNavigator({
    SelectPhoto: {
        screen: SelectPhoto,
        navigationOptions: {
            tabBarLabel: "SELECT"
        }
    },
    TakePhoto: {
        screen: TakePhoto,
        navigationOptions: {
            tabBarLabel: "TAKE"
        }
    }
}, {
    tabBarPosition: "bottom",
    tabBarOptions: {
        indicatorStyle: {
            backgroundColor: styles.blackColor
        },
        style: {
            backgroundColor: '#fff'
        },
        labelStyle: {
            color: styles.blackColor,
            fontWeight: "bold"
        },
        transitionConfig: () => fromRight()
    }
});

export default createStackNavigator({
    PhotoTabs: {
        screen: PhotoTabs,
        navigationOptions: {
            header: null
        }
    },
    UploadPhoto
},{
    defaultNavigationOptions:{
        backgroundColor: "white"
    }
});