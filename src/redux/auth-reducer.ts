import {authAPI, securityAPI} from '../api/api';
import {Dispatch} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {FormAction, stopSubmit} from 'redux-form';

type InitialStateType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captchaUrl: string | null
}
type ActionsType =
    | ReturnType<typeof setAuthUserData>
    | FormAction
    | ReturnType<typeof getCaptchaUrlSuccess>

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';

const initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null // if null, then captcha is not required
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
}) as const

export const getCaptchaUrlSuccess = (captchaUrl: string) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
}) as const

export const getAuthUserData = () => async (dispatch: Dispatch<ActionsType>) => {
    let response = await authAPI.me()

    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null) => async (dispatch: ThunkDispatch<InitialStateType, any, ActionsType>) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)

    if (response.data.resultCode === 0) {
        // success, get auth data
        await dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            await dispatch(getCaptchaUrl())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const getCaptchaUrl = () => async (dispatch: ThunkDispatch<InitialStateType, any, ActionsType>) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url

    dispatch(getCaptchaUrlSuccess(captchaUrl))

}

export const logout = () => async (dispatch: Dispatch<ActionsType>) => {
    let response = await authAPI.logout()

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}