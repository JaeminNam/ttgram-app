import React from "react";
import {Ionicons, SimpleLineIcons, MaterialCommunityIcons, MaterialIcons, FontAwesome} from "@expo/vector-icons";
import PropTypes from "prop-types";
import styles from "../styles";

const NavIcon = ({
    type = "Ionicons",
    name,
    color = styles.blackColor,
    style,
    size = 26,
    onPress
}) => {
    return (
        type === "Ionicons"
            ? <Ionicons name={name} color={color} style={style} size={size} onPress={onPress}/>
            : (
                type === "SimpleLineIcons"
                    ? <SimpleLineIcons name={name} color={color} style={style} size={size} onPress={onPress}/>
                    : (
                        type === "MaterialCommunityIcons"
                            ? <MaterialCommunityIcons name={name} color={color} style={style} size={size} onPress={onPress}/>
                            : (
                                type === "FontAwesome"
                                    ? <FontAwesome name={name} color={color} style={style} size={size} onPress={onPress}/>
                                    : <MaterialIcons name={name} color={color} style={style} size={size} onPress={onPress}/>
                            )
                    )
            )
    )
}

NavIcon.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string
};

export default NavIcon;