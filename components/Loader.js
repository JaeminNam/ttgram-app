import React from "react";
import {ActivityIndicator} from "react-native";
import styled from "styled-components";
import styles from "../styles";
import constants from "../constants"

const Container = styled.View `
    flex: 1;
    justify-content:center;
    align-items:center;
`;

export default({style = {top:(constants.height/2)-40}}) => (
    <Container>
        <ActivityIndicator color={styles.themeColor} size={40} style={style}/>
    </Container>
)