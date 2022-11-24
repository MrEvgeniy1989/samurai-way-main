import React from 'react';
import s from './Post.module.css';

type PostPropsType = {
    message: String;
    likesCount: number;
}

const Post: React.FC<PostPropsType> = (props) => {
    return (
        <div className={s.item}>
            <img src="https://365psd.com/images/istock/previews/9730/97305669-avatar-icon-of-girl-in-a-baseball-cap.jpg"
                 alt="avatar_icon"/>
            {props.message}
            <div>
                <span>like</span>{props.likesCount}
            </div>
        </div>
    );
}

export default Post;