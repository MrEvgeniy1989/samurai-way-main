import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {PostDataType} from '../../../redux/state';

type MyPostsPropsType = {
    posts: PostDataType[]
}

export const MyPosts: React.FC<MyPostsPropsType> = (props) => {
    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                    <button>Remove</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
}