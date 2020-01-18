import React from "react";
import {Platform} from "react-native";
import styled from "styled-components";
import {withNavigation} from "react-navigation";
import styles from "../styles";
import NavIcon from "./NavIcon";

const Container = styled.TouchableOpacity ``;

const Text = styled.Text ``;

export default withNavigation(({navigation}) => (
    <Container onPress={() => navigation.navigate("MessageNavigation")}>
        <NavIcon
            type={"SimpleLineIcons"}
            name={"paper-plane"}
            color={styles.blackColor}
            style={{paddingRight:10}}/>
    </Container>
));