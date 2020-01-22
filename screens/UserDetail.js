import React from "react";
import {View} from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../fragments";
import Loader from "../components/Loader";
import { ScrollView } from "react-native";
import UserProfile from "../components/UserProfile";

const GET_USER = gql`
  query seeUser($nickName: String!) {
    seeUser(nickName: $nickName) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

const ME_QUERY = gql`
  query me{
    me{
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export default ({ navigation }) => {
  const naviNickName = navigation.getParam("nickName");
  var queryResult = null;
  if(naviNickName !== undefined){
    queryResult= useQuery(GET_USER, {
      variables: { nickName: naviNickName},
      fetchPolicy: "network-only"
    });
  }else{
    queryResult= useQuery(ME_QUERY,{
      fetchPolicy: "network-only"
    });
  }
  const {loading,data } = queryResult;
  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView>
          {
            naviNickName !== undefined ?
            (
              data && data.seeUser && <UserProfile {...data.seeUser} />
            ) : (
              data && data.me && <UserProfile {...data.me} />
            )
          }
        </ScrollView>
      )}
    </View>
  );
};