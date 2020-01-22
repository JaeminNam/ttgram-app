import React from "react";
import {TouchableOpacity, Image, Text} from "react-native";
import {withNavigation} from "react-navigation";
import PropTypes from "prop-types";
import constants from "../constants";
import styled from "styled-components";

const DarkBox = styled.View`
    background-color:black;
    height:${(constants.width / 3) - 4};
    width:${(constants.width / 3) - 4};
    margin:2px;
    top:-${(constants.width / 3)};
    opacity:0.3;
`;
const DarkContainer = styled.View`
    flex-direction:column;
    margin-bottom:-${(constants.width / 3)*2};
    align-items:center;
    justify-content:center;
`;

const DarkText = styled.Text`
    height:${(constants.width / 3) - 4};
    top:-${(constants.width / 3)*2-43};
    color:white;
    font-size:50px;
`;

const SquarePhoto = ({
    navigation,
    file,
    files = [],
    idx,
    style = {
        width: (constants.width / 3) - 4,
        height: (constants.width / 3) - 4,
        margin: 2
    }
}) => (
    files.length > 0 && idx !== 2
        ? (
            <TouchableOpacity onPress={() => navigation.navigate("PhotoView", {files, idx})}>
                <Image
                    source={{
                        uri: file.url
                    }}
                    style={style}/>
            </TouchableOpacity>
        )
        : (
            <TouchableOpacity onPress={() => navigation.navigate("PhotoView", {files, idx})}>
                <DarkContainer>
                    <Image
                    source={{
                        uri: file.url
                    }}
                    style={style}/>
                    <DarkBox>
                    </DarkBox>
                    <DarkText>+{idx-1}</DarkText>
                </DarkContainer>
            </TouchableOpacity>
        )
);

SquarePhoto.propTypes = {
    files: PropTypes
        .arrayOf(
            PropTypes.shape({id: PropTypes.string.isRequired, url: PropTypes.string.isRequired})
        )
        .isRequired,
};

export default withNavigation(SquarePhoto);