import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {messagesDataType} from '../../Dialogs/Dialogs';

export type postDataType = {
    id: number
    message: string
    likesCount: number
}

export const MyPosts = () => {

    let posts: postDataType[] = [
        {id: 1, message: 'Hi, how are you?', likesCount: 15},
        {id: 2, message: 'It\'s my first post', likesCount: 20},
    ]

    let postsElements = posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

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