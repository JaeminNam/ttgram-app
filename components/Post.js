import React, {useState} from "react";
import {Image, Platform, Text} from "react-native";
import styled from "styled-components";
import {Ionicons} from "@expo/vector-icons";
import PropTypes from "prop-types";
import {gql} from "apollo-boost";
import constants from "../constants";
import styles from "../styles";
import {useMutation} from "react-apollo-hooks";
import {withNavigation} from "react-navigation";
import Swiper from "react-native-swiper";
import NavIcon from "./NavIcon";

const Container = styled.View `
  margin-bottom: 40px;
`;
const Header = styled.View `
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity ``;
const HeaderUserContainer = styled.View `
  margin-left: 10px;
`;
const Bold = styled.Text `
  font-weight: bold;
`;
const Location = styled.Text `
  font-size: 12px;
`;
const IconsContainer = styled.View `
  flex-direction: row;
  margin-bottom: 5px;
`;
const IconContainer = styled.View `
  margin-right: 10px;
`;
const InfoContainer = styled.View `
  padding: 10px;
`;
const Contents = styled.Text `
  margin: 5px 0px;
`;
const CommentCount = styled.Text `
  opacity: 0.5;
  font-size: 13px;
`;

export const TOGGLE_LIKE = gql `
    mutation toggleLike($postId : String!){
        toggleLike(postId : $postId)
    }
`;

const Post = (postData) => {
    // console.log(postData);
    const [isLiked, setIsLiked] = useState(postData.isLike);
    const [likeCount, setLikeCount] = useState(postData.likeCount);
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
        variables: {
            postId: postData.id
        }
    });
    const handleLike = async () => {
        if (isLiked) {
            setIsLiked(false);
            setLikeCount(cnt => cnt - 1)
        } else {
            setIsLiked(true);
            setLikeCount(cnt => cnt + 1)
        }
        try {
            await toggleLikeMutation();
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <Container>
            <Header>
                <Touchable>
                    <Image
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            borderWidth: 0.4,
                            borderColor: '#ccc'
                        }}
                        source={{
                            uri: postData.user.avatar
                        }}></Image>
                </Touchable>
                <Touchable>
                    <HeaderUserContainer>
                        <Bold>{postData.user.nickName}</Bold>
                        <Location>{postData.location}</Location>
                    </HeaderUserContainer>
                </Touchable>
            </Header>
            <Swiper
                showsPagination={true}
                dotColor={"#ccc"}
                dotStyle={{
                    top: 50,
                    width: 6,
                    height: 6
                }}
                activeDotStyle={{
                    top: 50
                }}
                style={{
                    height: constants.height / 2
                }}>
                {
                    postData
                        .files
                        .map(file => (
                            <Image
                                style={{
                                    width: constants.width,
                                    height: constants.height / 2
                                }}
                                key={file.id}
                                source={{
                                    uri: file.url
                                }}/>
                        ))
                }
            </Swiper>
            <InfoContainer>
                <IconsContainer>
                    <Touchable onPress={handleLike}>
                        <IconContainer>
                            <NavIcon
                                type={"MaterialCommunityIcons"}
                                color={isLiked
                                    ? styles.redColor
                                    : styles.blackColor}
                                size={30}
                                name={isLiked
                                    ? "heart"
                                    : "heart-outline"}/>
                        </IconContainer>
                    </Touchable>
                    <Touchable>
                        <IconContainer>
                            <NavIcon
                                type={"MaterialCommunityIcons"}
                                color={styles.blackColor}
                                size={30}
                                name={"message-outline"}/>
                        </IconContainer>
                    </Touchable>
                </IconsContainer>
                <Touchable>
                    <Text>{likeCount}
                        Likes</Text>
                </Touchable>
                <Contents>
                    <Bold>{postData.user.nickName}&nbsp;</Bold>
                    {postData.contents}
                </Contents>
                <Touchable>
                    <CommentCount>
                        See all {postData.comments.length}
                        comments
                    </CommentCount>
                </Touchable>
            </InfoContainer>
        </Container>
    )
}

Post.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes
        .shape(
            {id: PropTypes.string.isRequired, avatar: PropTypes.string, nickName: PropTypes.string.isRequired}
        )
        .isRequired,
    files: PropTypes
        .arrayOf(
            PropTypes.shape({id: PropTypes.string.isRequired, url: PropTypes.string.isRequired})
        )
        .isRequired,
    likeCount: PropTypes.number.isRequired,
    isLike: PropTypes.bool.isRequired,
    comments: PropTypes
        .arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired, text: PropTypes.string.isRequired,
            // user: PropTypes.shape({   id: PropTypes.string.isRequired,   nickName:
            // PropTypes.string.isRequired }).isRequired
        }))
        .isRequired,
    contents: PropTypes.string.isRequired,
    location: PropTypes.string,
    createdAt: PropTypes.string
};

export default Post;