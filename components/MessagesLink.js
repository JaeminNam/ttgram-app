import React from "react";
import {Platform} from "react-native";
import styled from "styled-components";
import {withNavigation} from "react-navigation";
import styles from "../styles";
import NavIcon from "./NavIcon";

const Container = styled.TouchableOpacity ``;

export default withNavigation(({navigation}) => (
    <Container onPress={() => navigation.navigate("PostingNavigation")}>
        <NavIcon
            type={"AntDesign"}
            name={"form"}
            color={styles.deptThemeColor}
            size={27}
            style={{paddingRight:15}}/>
    </Container>
));