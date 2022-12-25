import React from 'react';
import s from './Profile.module.css';
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {ActionsType, ProfilePageType} from '../../redux/store';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';

type ProfilePropsType = {
    // store: any
    // profilePage: ProfilePageType
    // // addPost: () => void
    // // updateNewPostText: (newText: string) => void
    // dispatch: (action: ActionsType) => void
}

export const Profile: React.FC<ProfilePropsType> = (props) => {
    return (
        <div className={s.profile}>
            <ProfileInfo/>
            <MyPostsContainer />
        </div>

    );
}