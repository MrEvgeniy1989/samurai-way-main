import React from 'react';
import s from './Profile.module.css';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import {ProfileType} from '../../redux/profile-reducer';

type ProfilePropsType = {
  profile: ProfileType | null
  status: string
  updateStatus: (status: string) => void
}

export const Profile = (props: ProfilePropsType) => {
  return (
    <div className={s.profile}>
      <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
      <MyPostsContainer/>
    </div>

  );
}