import {authAPI} from '../api/api';
import {Dispatch} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {FormAction, stopSubmit} from 'redux-form';

type InitialStateType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}
type ActionsType = ReturnType<typeof setAuthUserData> | FormAction

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';

const initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
}) as const

export const getAuthUserData = () => async (dispatch: Dispatch<ActionsType>) => {
    let response = await authAPI.me()

    if (response.data.resultCode === 0) {
        let {userId, email, login} = response.data.data
        dispatch(setAuthUserData(userId, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: ThunkDispatch<InitialStateType, any, ActionsType>) => {
    let response = await authAPI.login(email, password, rememberMe)

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}
export const logout = () => async (dispatch: Dispatch<ActionsType>) => {
    let response = await authAPI.logout()

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}