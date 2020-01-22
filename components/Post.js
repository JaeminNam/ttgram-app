import React, {useState} from "react";
import {Image} from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import {gql} from "apollo-boost";
import constants from "../constants";
import styles from "../styles";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {withNavigation} from "react-navigation";
import Swiper from "react-native-swiper";
import NavIcon from "./NavIcon";
import Moment from "moment";
import SquarePhoto from "./SquarePhoto";

const Container = styled.View `
    margin-bottom:10px;
    background-color:white;
    /* border-top-width:0.5px;
    border-top-color:${styles.lightThemeColor};
    border-bottom-width:0.5px;
    border-bottom-color:${styles.lightThemeColor}; */
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
  font-size: 17px;
`;
const Location = styled.Text `
  font-size: 13px;
`;
const IconsContainer = styled.View `
  flex-direction: row;
  margin-bottom: 5px;
`;
const CommentsContainer = styled.View `
  flex-direction: column;
  padding-bottom: 5px;
`;
const CommentBox = styled.View `
flex-direction: row;
margin-bottom:5px;
`;
const IconContainer = styled.View `
  margin-right: 15px;
`;
const InfoContainer = styled.View `
    margin: 0px 15px 0px 15px;
`;
const Contents = styled.Text `
  margin: 0px 10px 10px 15px;
`;
const UserLink = styled.Text `
    font-weight:bold;
`;
const CommentText = styled.Text `
`;
const InText = styled.Text `
font-size: 15px;
`;
const Line = styled.Text `
  margin:2px 0px 3px 0px;
  height:1px;
  border-style: solid;
  border-top-width: 0.5px;
  border-color: ${styles.lightThemeColor};
`;
const CommentCount = styled.Text `
  color:${styles.lightThemeColor};
  margin: 5px 15px 5px 15px;
  font-size: 13px;
`;
const CreateAt = styled.Text `
  color:${styles.lightThemeColor};
  margin: 0px 15px 5px 15px;
  font-size: 13px;
`;

const SquareContainer = styled.View `
    flex-direction: row;
    flex-wrap: wrap;
`;

export const TOGGLE_LIKE = gql `
    mutation toggleLike($postId : String!){
        toggleLike(postId : $postId)
    }
`;

const Post = ({
    id,
    user,
    location,
    files = [],
    likeCount: likeCountProp,
    contents,
    comments = [],
    isLike: isLikeProp,
    createdAt,
    commentCount,
    navigation
}) => {
    const [isLiked, setIsLiked] = useState(isLikeProp);
    const [likeCount, setLikeCount] = useState(likeCountProp);
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
        variables: {
            postId: id
        }
    });
    const dateFormat = (param) => {
        return Moment(param).format("YYYY/MM/DD HH:mm:ss");
    }
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
                <Touchable
                    activeOpacity={1}
                    onPress={() => navigation.navigate("UserDetail", {nickName: user.nickName})}>
                    <Image
                        style={{
                            width: 35,
                            height: 35,
                            borderRadius: 18,
                            borderWidth: 0.4,
                            borderColor: styles.lightThemeColor
                        }}
                        source={{
                            uri: user.avatar
                        }}></Image>
                </Touchable>
                <Touchable
                    activeOpacity={1}
                    onPress={() => navigation.navigate("UserDetail", {nickName: user.nickName})}>
                    <HeaderUserContainer>
                        <Bold
                            style={{
                                color: styles.fontThemeColor
                            }}>{user.nickName}</Bold>
                        {
                            location === ""
                                ? null
                                : <Location>{location}</Location>
                        }
                    </HeaderUserContainer>
                </Touchable>
            </Header>
            <Contents
                style={{
                    color: styles.fontThemeColor
                }}>
                {contents}
            </Contents>
            <SquareContainer>
                {
                    files.length > 0
                        ? ( 
                            files.map((file, idx) => (idx <= 2 ?<SquarePhoto key={idx} file={file} files={files} idx={idx}></SquarePhoto>:null))
                        )
                        : null
                }

            </SquareContainer>
            <CreateAt>{dateFormat(createdAt)}</CreateAt>
            <InfoContainer>
                <IconsContainer>
                    <Touchable onPress={handleLike}>
                        <IconContainer>
                            <InText
                                style={{
                                    color: isLiked
                                        ? styles.themeColor
                                        : styles.darkGreyColor
                                }}>
                                <NavIcon
                                    type={"AntDesign"}
                                    size={18}
                                    color={isLiked
                                        ? styles.themeColor
                                        : styles.darkGreyColor}
                                    name={isLiked
                                        ? "like1"
                                        : "like2"}/>
                                &nbsp;{likeCount}
                            </InText>
                        </IconContainer>
                    </Touchable>
                    <Touchable>
                        <IconContainer>
                            <InText
                                style={{
                                    color: styles.darkGreyColor
                                }}>
                                <NavIcon
                                    type={"AntDesign"}
                                    size={18}
                                    color={styles.darkGreyColor}
                                    name={"message1"}/>
                                &nbsp;{commentCount}
                            </InText>
                        </IconContainer>
                    </Touchable>
                    {
                        files.length > 0 ? (
                            <Touchable onPress={() => navigation.navigate("PhotoView", {files})}>
                                <IconContainer>
                                    <InText
                                        style={{
                                            color: styles.darkGreyColor
                                        }}>
                                        <NavIcon
                                            type={"FontAwesome"}
                                            size={18}
                                            color={styles.darkGreyColor}
                                            name={"picture-o"}/>
                                        &nbsp;{files.length}
                                    </InText>
                                </IconContainer>
                            </Touchable>
                        ):null
                    }
                </IconsContainer>
            </InfoContainer>
            {
                commentCount > 0
                    ? <Line></Line>
                    : null
            }
            {
                commentCount >= 3
                    ? <Touchable>
                            <CommentCount>
                                See all {commentCount}
                                comments
                            </CommentCount>
                        </Touchable>
                    : null
            }
            <InfoContainer>
                <CommentsContainer>
                    {
                        comments
                            .slice(0, 3)
                            .map(comment => (
                                <CommentBox key={comment.id}>
                                    <Touchable
                                    activeOpacity={1}
                                    onPress={() => navigation.navigate("UserDetail", {nickName: user.nickName})}>
                                        <UserLink
                                            style={{
                                                color: styles.fontThemeColor
                                            }}>
                                            {comment.user.nickName}&nbsp;:&nbsp;
                                        </UserLink>
                                    </Touchable>
                                    <CommentText
                                        style={{
                                            color: styles.fontThemeColor
                                        }}>{comment.text}</CommentText>
                                </CommentBox>
                            ))
                    }
                </CommentsContainer>
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
            // user: PropTypes.shape({     id: PropTypes.string.isRequired,     nickName:
            // PropTypes.string.isRequired }).isRequired
        }))
        .isRequired,
    contents: PropTypes.string.isRequired,
    location: PropTypes.string,
    createdAt: PropTypes.string
};

export default withNavigation(Post);