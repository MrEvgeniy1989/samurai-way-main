import React from "react";
import { addPostActionCreator } from "../../../redux/profile-reducer";
import { MyPosts } from "./MyPosts";
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";
import { Dispatch } from "redux";
import { PostType } from "../../../types/types";

type MapStateToPropsType = {
  posts: PostType[];
};
type MapDispatchToPropsType = {
  addPost: (newPostText: string) => void;
};
export type MyPostsPropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    posts: state.profilePage.posts,
  };
};
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
  return {
    addPost: (newPostText: string) => {
      dispatch(addPostActionCreator(newPostText));
    },
  };
};

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
