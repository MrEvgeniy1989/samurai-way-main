import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {ActionsType, PostDataType} from '../../../redux/state';

type MyPostsPropsType = {
    posts: PostDataType[]
    newPostText: string
    dispatch: (action: ActionsType) => void
    // addPost: () => void
    // updateNewPostText: (newText: string) => void
}

export const MyPosts: React.FC<MyPostsPropsType> = (props) => {
    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    const addPost = () => {
        // props.addPost()
        props.dispatch({type: 'ADD-POST'})
    }

    const onPostChange = () => {
        if (newPostElement.current) {
            const text = newPostElement.current?.value
            // props.updateNewPostText(text)
            props.dispatch({type: 'UPDATE-NEW-POST-TEXT', newText: text})
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