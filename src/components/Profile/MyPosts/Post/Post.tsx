import React from 'react';
import s from './Post.module.css';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

type PostPropsType = {
  message: string;
  likesCount: number;
};

export const Post: React.FC<PostPropsType> = props => {
  return (
    <div className={s.post}>
      {/*<img*/}
      {/*  src="https://365psd.com/images/istock/previews/9730/97305669-avatar-icon-of-girl-in-a-baseball-cap.jpg"*/}
      {/*  alt="avatar_icon"*/}
      {/*/>*/}
      <Avatar icon={<UserOutlined />} />
      <div className={s.post_text}>
        {props.message}
        <div className={s.post_like}>
          <span>like: </span>
          {props.likesCount}
        </div>
      </div>
    </div>
  );
};
