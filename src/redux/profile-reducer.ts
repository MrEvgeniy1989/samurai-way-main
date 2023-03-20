import {profileAPI, usersAPI} from '../api/api';
import {Dispatch} from 'redux';

export type PostDataType = {
  id: number
  message: string
  likesCount: number
}
export type ProfileType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
  }
  photos: {
    small: (string)
    large: (string)
  }
}
export type InitialStateType = {
  posts: PostDataType[]
  newPostText: string
  profile: ProfileType | null
  status: string
}

type ActionsType =
  ReturnType<typeof addPostActionCreator>
  | ReturnType<typeof updateNewPostTextActionCreator>
  | ReturnType<typeof setUserProfile>
  | ReturnType<typeof setStatus>

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

const initialState: InitialStateType = {
  posts: [
    {id: 1, message: 'Hi, how are you?', likesCount: 15},
    {id: 2, message: 'It\'s my first post', likesCount: 20},
  ],
  newPostText: '',
  profile: null,
  status: ''
}

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      const newPost: PostDataType = {id: 5, message: state.newPostText, likesCount: 0}
      return {...state, posts: [...state.posts, newPost], newPostText: ''}
    }
    case UPDATE_NEW_POST_TEXT: {
      return {...state, newPostText: action.newText}
    }
    case SET_USER_PROFILE: {
      return {...state, profile: action.profile}
    }
    case SET_STATUS: {
      return {...state, status: action.status}
    }
    default:
      return state
  }
}

export const addPostActionCreator = () => ({type: ADD_POST}) as const
export const setUserProfile = (profile: ProfileType | null) => ({type: SET_USER_PROFILE, profile}) as const
export const setStatus = (status: string) => ({type: SET_STATUS, status}) as const
export const updateNewPostTextActionCreator = (text: string) => ({type: UPDATE_NEW_POST_TEXT, newText: text}) as const

export const getUserProfile = (userId: number) => (dispatch: Dispatch) => {
  profileAPI.getProfile(userId).then(response => {
    dispatch(setUserProfile(response.data))
  })
}
export const getStatus = (userId: number) => (dispatch: Dispatch) => {
  profileAPI.getStatus(userId).then(response => {
    dispatch(setStatus(response.data))
  })
}
export const updateStatus = (status: string) => (dispatch: Dispatch) => {
  profileAPI.updateStatus(status).then(response => {
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status))
    }
  })
}
