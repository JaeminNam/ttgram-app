import { createAppContainer} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Signup from "../screens/Auth/Signup";
import AuthConfirm from "../screens/Auth/AuthConfirm";
import Login from "../screens/Auth/Login";
import AuthHome from "../screens/Auth/AuthHome";

const AuthNavigation = createStackNavigator(
    {   
        AuthHome
        ,Signup
        ,AuthConfirm
        ,Login
    },
    {
        headerMode :"none"
    }
);

export default createAppContainer(AuthNavigation);