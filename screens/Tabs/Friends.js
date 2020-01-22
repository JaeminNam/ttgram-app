import React, { useState } from "react";
import { ScrollView, RefreshControl, View } from "react-native";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Loader from "../../components/Loader";
import Post from "../../components/Post";
import { POST_FRAGMENT } from "../../fragments";
import styles from "../../styles";


export const FEED_QUERY = gql`
  {
    seeFeed {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

const Friends = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch } = useQuery(FEED_QUERY,{
    // fetchPolicy: "network-only"
  });
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
          data &&
          data.seeFeed &&
          data.seeFeed.map(post => <Post key={post.id} {...post} />)
        }
        </ScrollView>)
    }
    </View>

  );
};

export default Friends;