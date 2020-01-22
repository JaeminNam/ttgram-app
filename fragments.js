import { gql } from "apollo-boost";

export const POST_FRAGMENT = gql`
  fragment PostParts on Post {
    id
    location
    contents
    user{
      id
      avatar
      nickName
    }
    files {
      id
      url
    }
    likeCount
    commentCount
    isLike
    comments {
      id
      user{
        id
        avatar
        nickName
      }
      text
    }
    createdAt
  }
`;
export const COMMENT_FRAGMENT = gql`
  fragment CommentParts on Comment {
    id
    user{
      id
      avatar
      nickName
    }
    text
    createdAt
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserParts on User {
    id
    avatar
    nickName
    fullName
    isFollowing
    followingCount
    followersCount
    postsCount
    memo
    posts {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;