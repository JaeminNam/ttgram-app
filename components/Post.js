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
    margin-bottom:10px;
    background-color:white;
`;
const Header = styled.View `
  margin: 10px 15px 10px 15px;
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
  margin-left: 10px;
`;
const IconContainer = styled.View `
  margin-right: 30px;
`;
const InfoContainer = styled.View `
  padding: 10px;
`;
const Contents = styled.Text `
  margin: 0px 10px 10px 15px;
`;
const CommentCount = styled.Text `
color:#3a56a2;
  opacity: 0.5;
  font-size: 13px;
`;
const InText = styled.Text`
font-size: 20px;
`;

export const TOGGLE_LIKE = gql `
    mutation toggleLike($postId : String!){
        toggleLike(postId : $postId)
    }
`;

const Post = (postData) => {
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
            <Contents>
                {postData.contents}
            </Contents>
            
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
                    height: constants.height / 5
                }}>
                {
                    postData
                        .files
                        .map(file => (
                            <Image
                                style={{
                                    width: constants.width,
                                    height: constants.height / 5
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
                            <InText style={{color:isLiked
                                ? styles.themeColor
                                : styles.darkGreyColor}}>
                                <NavIcon
                                    type={"AntDesign"}
                                    size={20}
                                    color={isLiked
                                        ? styles.themeColor
                                        : styles.darkGreyColor}
                                    name={isLiked
                                        ? "heart"
                                        : "hearto"}/>
                                &nbsp;{likeCount}
                            </InText>
                        </IconContainer>
                    </Touchable>
                    <Touchable>
                        <IconContainer>
                        <InText style={{color:styles.darkGreyColor}}>
                            <NavIcon
                                type={"AntDesign"}
                                size={20}
                                color={styles.darkGreyColor}
                                name={"message1"}/>
                                &nbsp;{postData.commentCount}
                        </InText>
                        </IconContainer>
                    </Touchable>
                    <Touchable>
                        <IconContainer>
                        <InText style={{color:styles.darkGreyColor}}>
                            <NavIcon
                                type={"FontAwesome"}
                                size={20}
                                color={styles.darkGreyColor}
                                name={"picture-o"}/>
                                &nbsp;{postData.files.length}
                        </InText>
                        </IconContainer>
                    </Touchable>
                </IconsContainer>
                {postData.commentCount >= 3 ? 
                    <Touchable>
                        <CommentCount>
                            See all {postData.commentCount} comments
                        </CommentCount>
                    </Touchable>
                 : 
                 null}
                
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