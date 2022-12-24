import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {ActionsType, PostDataType} from '../../../redux/store';
import {addPostActionCreator, updateNewPostTextActionCreator} from '../../../redux/profile-reducer';

type MyPostsPropsType = {
    posts: PostDataType[]
    addPost: () => void
    updateNewPostText: (text: string) => void
    newPostText: string
    // dispatch: (action: ActionsType) => void
}

export const MyPosts: React.FC<MyPostsPropsType> = (props) => {
    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    const onAddPost = () => {
        props.addPost()
    }

    const onPostChange = () => {
        if (newPostElement.current) {
            const text = newPostElement.current?.value
            props.updateNewPostText(text)
        }
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
}