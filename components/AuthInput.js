import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";

const Container = styled.View `
    margin-bottom:10px;
`;

const TextInput = styled.TextInput `
    background-color:${props => props.theme.greyColor};
    padding:3px;
    width:${constants.width/1.7};
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const AuthInput = ({keyboardType = "default", placeholder, value, autoCapitalize, onChange, secureTextEntry=false}) => (
    <Container><TextInput secureTextEntry={secureTextEntry} onChangeText={onChange} keyboardType={keyboardType} placeholder={placeholder} value={value} autoCapitalize={autoCapitalize}/></Container>
)

AuthInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    keyboardType: PropTypes.oneOf(
        ["default", "number-pad", "decimal-pad", "numeric", "email-address", "phone-pad"]
    ),
    autoCapitalize: PropTypes.oneOf(
        ["none", "sentences", "words", "char"]
    ),
    onChange: PropTypes.func.isRequired
};

export default AuthInput;