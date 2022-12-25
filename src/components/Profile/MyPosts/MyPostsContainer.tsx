import React from 'react';
import {ActionsType, PostDataType} from '../../../redux/store';
import {addPostActionCreator, updateNewPostTextActionCreator} from '../../../redux/profile-reducer';
import {MyPosts} from './MyPosts';
import {StoreContext} from '../../../StoreContext';

type MyPostsContainerPropsType = {
    // store: any

    // posts: PostDataType[]
    // newPostText: string
    // dispatch: (action: ActionsType) => void
}

export const MyPostsContainer: React.FC<MyPostsContainerPropsType> = (props) => {
    return (
        <StoreContext.Consumer>
            {store => {
                let state = store.getState()
                const addPost = () => {
                    store.dispatch(addPostActionCreator())
                }

                const onPostChange = (text: string) => {
                    store.dispatch(updateNewPostTextActionCreator(text))
                }

                return <MyPosts updateNewPostText={onPostChange}
                                addPost={addPost}
                                posts={state.profilePage.posts}
                                newPostText={state.profilePage.newPostText}
                />
            }
            }
        </StoreContext.Consumer>
    );
}