import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { createField, MyTextarea } from '../../../common/FormsControls/FormsControls';
import { GetStringKeys } from '../../../../types/types';
import s from './AddPostForm.module.css';

type PropsType = {};

export type AddPostFormValuesType = {
  newPostText: string;
};

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>;

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = props => {
  return (
    <form onSubmit={props.handleSubmit} className={s.addPostForm}>
      <div className={s.addPostForm__inputContainer}>
        {createField<AddPostFormValuesTypeKeys>('Your post', 'newPostText', [] /*[required]*/, MyTextarea)}
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

export default reduxForm<AddPostFormValuesType, PropsType>({ form: 'profile-add-post' })(AddPostForm);
