import { MyPosts } from "./MyPosts";
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";
import { PostType } from "../../../types/types";
import { profileReducerActions } from "../../../redux/profile-reducer";

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    posts: state.profilePage.posts,
  };
};

export const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
  mapStateToProps,
  { addPost: profileReducerActions.addPostActionCreator }
)(MyPosts);

// Types
type MapStateToPropsType = { posts: PostType[] };
type MapDispatchToPropsType = { addPost: (newPostText: string) => void };
export type MyPostsPropsType = MapStateToPropsType & MapDispatchToPropsType;
