import React, { FC } from "react";
import style from "./MyPosts.module.css";
import { Post } from "./Post/Post";
import { MyPostsPropsType } from "./MyPostsContainer";
import AddPostForm, { AddPostFormValuesType } from "./AddPostForm/AddPostForm";

export const MyPosts: FC<MyPostsPropsType> = React.memo((props) => {
  let postsElements = [...props.posts]
    .reverse()
    .map((p) => <Post key={p.id} message={p.message} likesCount={p.likesCount} />);

  const onAddPost = (formData: AddPostFormValuesType) => {
    props.addPost(formData.newPostText);
  };

  return (
    <div className={style.postsBlock}>
      <h3>My posts</h3>
      <AddPostForm onSubmit={onAddPost} />
      <div className={style.posts}>{postsElements}</div>
    </div>
  );
});
