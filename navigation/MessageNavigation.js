import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import Messages from "../screens/Message/Messages";
import Message from "../screens/Message/Message";

export default createStackNavigator({
    Messages: {
        screen: Messages,
        navigationOptions: {
            headerStyle: {
                elevation: 2, // remove shadow on Android
                shadowOpacity: 2, // remove shadow on iOS
            }
        }
    },
    Message
}, {
    transitionConfig: () => fromRight()
});