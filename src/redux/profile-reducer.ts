import { BaseThunkType, InferActionsTypes } from './redux-store';
import { FormAction, stopSubmit } from 'redux-form';
import { PhotosType, PostType, ProfileType } from '../types/types';
import { profileAPI } from '../api/profile-api';
import { ResultCodesEnum } from '../api/api';

const initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likesCount: 15 },
    { id: 2, message: "It's my first post", likesCount: 20 },
    { id: 3, message: 'my first post', likesCount: 10 },
    { id: 4, message: 'My second post', likesCount: 25 },
  ] as PostType[],
  profile: null as ProfileType | null,
  status: '',
};

export const profileReducer = (state = initialState, action: ActionsType): ProfileReducerInitialStateType => {
  switch (action.type) {
    case 'SN/PROFILE/ADD-POST': {
      let newPost = { id: 5, message: action.newPostText, likesCount: 0 };
      return { ...state, posts: [...state.posts, newPost] };
    }
    case 'SN/PROFILE/SET_STATUS': {
      return { ...state, status: action.status };
    }
    case 'SN/PROFILE/SET_USER_PROFILE': {
      return { ...state, profile: action.profile };
    }
    case 'SN/PROFILE/DELETE_POST':
      return { ...state, posts: state.posts.filter(p => p.id !== action.postId) };
    case 'SN/PROFILE/SAVE_PHOTO_SUCCESS':
      return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType };
    default:
      return state;
  }
};

// Actions
export const profileReducerActions = {
  addPostActionCreator: (newPostText: string) => ({ type: 'SN/PROFILE/ADD-POST', newPostText } as const),
  setUserProfile: (profile: ProfileType) => ({ type: 'SN/PROFILE/SET_USER_PROFILE', profile } as const),
  setStatus: (status: string) => ({ type: 'SN/PROFILE/SET_STATUS', status } as const),
  deletePost: (postId: number) => ({ type: 'SN/PROFILE/DELETE_POST', postId } as const),
  savePhotoSuccess: (photos: PhotosType) => ({ type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos } as const),
};

// Thunks
export const getUserProfile =
  (userId: number): ThunkType =>
  async dispatch => {
    const data = await profileAPI.getProfile(userId);
    dispatch(profileReducerActions.setUserProfile(data));
  };

export const getStatus =
  (userId: number): ThunkType =>
  async dispatch => {
    let data = await profileAPI.getStatus(userId);
    dispatch(profileReducerActions.setStatus(data));
  };

export const updateStatus =
  (status: string): ThunkType =>
  async dispatch => {
    try {
      let data = await profileAPI.updateStatus(status);

      if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(profileReducerActions.setStatus(status));
      }
    } catch (error) {
      //
    }
  };

export const savePhoto =
  (file: File): ThunkType =>
  async dispatch => {
    let data = await profileAPI.savePhoto(file);

    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(profileReducerActions.savePhotoSuccess(data.data.photos));
    }
  };

export const saveProfile =
  (profile: ProfileType): ThunkType =>
  async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);

    if (data.resultCode === 0) {
      if (userId != null) {
        dispatch(getUserProfile(userId));
      } else {
        throw new Error("userId can't be null");
      }
    } else {
      dispatch(stopSubmit('edit-profile', { _error: data.messages[0] }));
      return Promise.reject(data.messages[0]);
    }
  };

// Types
export type ProfileReducerInitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof profileReducerActions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;
