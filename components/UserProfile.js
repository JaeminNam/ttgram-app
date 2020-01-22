import React, { useState } from "react";
import { Image, View, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import styles from "../styles";
import constants from "../constants";
import Post from "./Post";
import AutoHeightImage from "react-native-auto-height-image";
import {withNavigation} from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";
import NavIcon from "./NavIcon";

const ProfileHeader = styled.View`
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    /* margin-top:50px; */
    top:-80;
    margin-bottom:-80;
`;
const HeaderColumn = styled.View`
    flex-direction: row;
    padding: 0px 0px 15px 0px;
    border-top-width:0.5px;
    border-top-color:${styles.darkGreyColor};
    padding-top:12px;
`;
const HeaderTopColumn = styled.View`
    flex-direction: column;
    align-items:center;
    margin-bottom:15px;
`;
const TopStat = styled.View`
    align-items: center;
`;

const TopBold = styled.Text`
    font-size:25px;
    color:${styles.lightFontThemeColor};
`;

const ProfileStats = styled.View`
    flex-direction: row;
`;

const Stat = styled.View`
    align-items: center;
    width:${(constants.width/3.7)};
`;

const Bold = styled.Text`
    font-size:23px;
    color:${styles.lightFontThemeColor};
`;

const StatName = styled.Text`
    margin-top: 5px;
    font-size: 15px;
    color:${styles.lightFontThemeColor};
`;

const GridContainer = styled.View`
    width:${constants.width};
    height:50px;
    flex-direction:row;
    padding-top:10px;
    border-top-width:0.5;
    border-bottom-width:0.5;
    border-top-color:${styles.lightThemeColor};
    border-bottom-color:${styles.lightThemeColor};
    background-color:white;
`;

const InText = styled.Text `
`;

const GridBox = styled.View`
    width:${constants.width/2};
    background-color:white;
    align-items:center;
`;
const Touchable = styled.TouchableOpacity ``;

const ImgBox  = styled.View`
    background-color:${styles.themeColor};
    opacity:0.7;
`;
const MemoBox  = styled.View`
    padding: 0px ${(constants.width-(constants.width/3.7)*3)/2}px 0px ${(constants.width-(constants.width/3.7)*3)/2}px;
`;

const UserProfile = ({
    id
    ,avatar
    ,memo
    ,nickName
    ,fullName
    ,isFollowing
    ,followingCount
    ,followersCount
    ,postsCount
    ,posts,
    navigation
}) => { 
    return (
        <ScrollView
        style={{backgroundColor: styles.bgThemeColor}}>
            {
                <Touchable activeOpacity={0.9} onPress={() => navigation.navigate("PhotoView", {file:avatar})}>
                    <ImgBox>
                        <Image source={{uri:avatar}} style={{height:(constants.width),width:constants.width}}/>
                    </ImgBox>
                </Touchable>
            }
            <ProfileHeader>
                <HeaderTopColumn >
                    <Touchable activeOpacity={1} onPress={() => navigation.navigate("PhotoView", {file:avatar})}>
                        <Image
                            style={{
                                height: 140,
                                width: 140,
                                borderRadius: 70,
                                borderColor: "#fff",
                                borderWidth:3,
                                marginBottom:3
                            }}
                            source={{
                                uri: avatar
                            }}/>
                    </Touchable>
                    <ProfileStats>
                    <TopStat>
                        <TopBold>{nickName}</TopBold>
                    </TopStat>
                    </ProfileStats>
                    
                    <MemoBox>
                        <StatName>{memo}</StatName>
                    </MemoBox>
                </HeaderTopColumn>
                <HeaderColumn>
                    <ProfileStats>
                        <Stat>
                            <Bold>{postsCount}</Bold>
                            <StatName>Post</StatName>
                        </Stat>
                        <Stat>
                            <Bold>{followingCount}</Bold>
                            <StatName>Followers</StatName>
                        </Stat>
                        <Stat>
                        <Bold>{followersCount}</Bold>
                            <StatName>Following</StatName>
                        </Stat>
                    </ProfileStats>
                </HeaderColumn>
            </ProfileHeader>
            <GridContainer>
                <GridBox>
                    <NavIcon type={"AntDesign"} name={"laptop"} size={30} style={{ color: styles.lightFontThemeColor, }}/>
                </GridBox>
                <GridBox>
                    <NavIcon type={"AntDesign"} name={"profile"} size={30} style={{ color: styles.lightFontThemeColor, }}/>
                </GridBox>
            </GridContainer>
            <View>
            {
                posts ?  posts
                    .map(post => (
                        <Post key={post.id} {...post}/>
                    )) : null
            }
            </View>
        </ScrollView>
    )
};

export default withNavigation(UserProfile);