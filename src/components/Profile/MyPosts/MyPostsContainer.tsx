import React from 'react';
import {ActionsType, PostDataType} from '../../../redux/store';
import {addPostActionCreator, updateNewPostTextActionCreator} from '../../../redux/profile-reducer';
import {MyPosts} from './MyPosts';

type MyPostsContainerPropsType = {
    store: any

    // posts: PostDataType[]
    // newPostText: string
    // dispatch: (action: ActionsType) => void
}

export const MyPostsContainer: React.FC<MyPostsContainerPropsType> = (props) => {
    let state = props.store.getState()

    const addPost = () => {
        props.store.dispatch(addPostActionCreator())
    }

    const onPostChange = (text: string) => {
        props.store.dispatch(updateNewPostTextActionCreator(text))
    }

    return (
        <MyPosts updateNewPostText={onPostChange} addPost={addPost} posts={state.profilePage.posts} newPostText={state.profilePage.newPostText}/>);
}