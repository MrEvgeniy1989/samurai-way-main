import React, {FC} from 'react';
import style from './MyPosts.module.css';
import Post from './Post/Post';
import {MyPostsPropsType} from './MyPostsContainer';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';

export const MyPosts = (props: MyPostsPropsType) => {
  let postsElements = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)

  const onAddPost = (formData: FormDataType) => {
    props.addPost(formData.newPostText)
  }

  return (
    <div className={style.postsBlock}>
      <h3>My posts</h3>
      <AddNewPostFormRedux onSubmit={onAddPost}/>
      <div className={style.posts}>
        {postsElements}
      </div>
    </div>
  );
}


type AddNewPostFormPropsType = {}

type FormDataType = {
  newPostText: string
}

let AddNewPostForm: FC<InjectedFormProps<FormDataType> & AddNewPostFormPropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name={'newPostText'} component={'textarea'}/>
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  )
}

let AddNewPostFormRedux = reduxForm<FormDataType>({form: 'ProfileAddNewPostForm'})(AddNewPostForm)