import React, {useState} from "react";
import {ScrollView, RefreshControl, View} from "react-native";
import styled from "styled-components";
import {gql} from "apollo-boost";
import {useQuery} from "@apollo/react-hooks";
import Loader from "../components/Loader";
import Post from "../components/Post";
import {POST_FRAGMENT} from "../fragments";
import styles from "../styles";

export const FEED_QUERY = gql `
  {
    seeAllPost {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

export const COMMENT_QUERY = gql `
  query($id:String!) {
    getComment(id:$id){
        id
        user{
            id
            avatar
            nickName
        }
        text
        createdAt
    }
  }
`;

const Home = () => {
    const [refreshing, setRefreshing] = useState(false);
    const {loading, data, refetch} = useQuery(FEED_QUERY,{
        // fetchPolicy: "network-only"
      });
    const getCommentFunc = async (param) => {
        const {commentData} = useQuery(COMMENT_QUERY, {
            variables: {
                id: param
            },
            fetchPolicy: "network-only"
        })
        if (commentData && commentData.getComment) {
            return commentData.getComment;
        } else {
            return null;
        }
    }

    const refresh = async () => {
        try {
            setRefreshing(true);
            await refetch();
        } catch (e) {
            console.log(e);
        } finally {
            setRefreshing(false);
        }
    };
    return (
        <View>
        {loading
            ? (<Loader />)
            : ( <ScrollView
                style={{backgroundColor: styles.bgThemeColor,color: styles.deptThemeColor}}
                refreshControl={
                  <RefreshControl refreshing = {refreshing}
                  onRefresh = {refresh} />
            }>
            {
                data && data.seeAllPost && data.seeAllPost.map((post) => <Post key={post.id} {...post}/>)
            }
            </ScrollView>)
        }
        </View>
       
    );
};

export default Home;