import React from "react";
import {
    Ionicons,
    SimpleLineIcons,
    MaterialCommunityIcons,
    MaterialIcons,
    FontAwesome,
    AntDesign,
    Feather,
    EvilIcons
} from "@expo/vector-icons";
import PropTypes from "prop-types";
import styles from "../styles";

const NavIcon = ({
    type = "Ionicons",
    name,
    color = styles.lightGreyColor,
    style,
    size = 26,
    onPress
}) => {
    switch (type) {
        case "Ionicons":
            return <Ionicons name={name} color={color} style={style} size={size} onPress={onPress}/>
        case "MaterialCommunityIcons":
            return <MaterialCommunityIcons name={name} color={color} style={style} size={size} onPress={onPress}/>
        case "FontAwesome":
            return <FontAwesome name={name} color={color} style={style} size={size} onPress={onPress}/>
        case "AntDesign":
            return <AntDesign name={name} color={color} style={style} size={size} onPress={onPress}/>
        case "MaterialIcons":
            return <MaterialIcons name={name} color={color} style={style} size={size} onPress={onPress}/>
        case "Feather":
            return <Feather name={name} color={color} style={style} size={size} onPress={onPress}/>
        case "SimpleLineIcons":
            return <SimpleLineIcons name={name} color={color} style={style} size={size} onPress={onPress}/>
        case "EvilIcons":
            return <EvilIcons name={name} color={color} style={style} size={size} onPress={onPress}/>
        default:
            return null;
    }
}

NavIcon.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string
};

export default NavIcon;