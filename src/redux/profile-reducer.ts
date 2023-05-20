import {profileAPI} from '../api/api';
import {Dispatch} from 'redux';
import {AppStateType, AppThunk} from "./redux-store";
import {stopSubmit} from "redux-form";

export type PostDataType = {
    id: number
    message: string
    likesCount: number
}
export type ProfileType = {
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        [key: string]: string | null
        github: string | null
        vk: string | null
        facebook: string | null
        instagram: string | null
        twitter: string | null
        website: string | null
        youtube: string | null
        mainLink: string | null
    }
    photos: {
        small: string
        large: string
    }
}
export type InitialStateType = {
    posts: PostDataType[]
    profile: ProfileType
    status: string
}

type ActionsType =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof deletePost>
    | ReturnType<typeof savePhotoSuccess>

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

const initialState: InitialStateType = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 15},
        {id: 2, message: 'It\'s my first post', likesCount: 20},
    ],
    profile: {} as ProfileType,
    status: ''
}

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            const newPost: PostDataType = {id: 5, message: action.newPostText, likesCount: 0}
            return {...state, posts: [...state.posts, newPost]}
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        case DELETE_POST: {
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        }
        case SAVE_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos}}
        }
        default:
            return state
    }
}

export const addPostActionCreator = (newPostText: string) => ({type: ADD_POST, newPostText}) as const
export const setUserProfile = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile}) as const
export const setStatus = (status: string) => ({type: SET_STATUS, status}) as const
export const deletePost = (postId: number) => ({type: DELETE_POST, postId}) as const
export const savePhotoSuccess = (photos: { small: string; large: string }) => ({
    type: 'SAVE_PHOTO_SUCCESS',
    photos
}) as const

export const getUserProfile = (userId: number) => async (dispatch: Dispatch) => {
    const response = await profileAPI.getProfile(userId)

    dispatch(setUserProfile(response.data))
}
export const getStatus = (userId: number) => async (dispatch: Dispatch) => {
    const response = await profileAPI.getStatus(userId)

    dispatch(setStatus(response.data))
}
export const updateStatus = (status: string) => async (dispatch: Dispatch) => {
    const response = await profileAPI.updateStatus(status)

    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
export const savePhoto = (file: File) => async (dispatch: Dispatch) => {
    const response = await profileAPI.savePhoto(file)

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType): AppThunk => async (dispatch, getState: () => AppStateType) => {
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)

    if (response.data.resultCode === 0) {
        if (userId) {
            await dispatch(getUserProfile(userId))
        }
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}