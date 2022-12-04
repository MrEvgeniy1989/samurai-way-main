import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {PostDataType} from '../../../redux/state';

type MyPostsPropsType = {
    posts: PostDataType[]
    addPost: (postMessage: string)=>void
}

export const MyPosts: React.FC<MyPostsPropsType> = (props) => {
    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    const addPost = () => {
        if (newPostElement.current) {
            const text = newPostElement.current?.value
            props.addPost(text)
        }
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea ref={newPostElement}></textarea>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                    {/*<button>Remove</button>*/}
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
}