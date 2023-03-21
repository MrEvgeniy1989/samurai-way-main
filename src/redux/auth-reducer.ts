import {authAPI} from '../api/api';
import {Dispatch} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {FormAction, stopSubmit} from 'redux-form';

type InitialStateType = {
  id: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
}
type ActionsType = ReturnType<typeof setAuthUserData> | FormAction

const SET_USER_DATA = 'SET_USER_DATA';

const initialState: InitialStateType = {
  id: null,
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

export const getAuthUserData = () => (dispatch: Dispatch<ActionsType>) => {
  authAPI.me().then(response => {
    if (response.data.resultCode === 0) {
      let {id, email, login} = response.data.data
      dispatch(setAuthUserData(id, email, login, true))
    }
  })
}

export const login = (email: string, password: string, rememberMe: boolean) => (dispatch: ThunkDispatch<InitialStateType, any, ActionsType>) => {
  authAPI.login(email, password, rememberMe).then(response => {
    if (response.data.resultCode === 0) {
      dispatch(getAuthUserData())
    } else {
      let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
      dispatch(stopSubmit('login', {_error: message}))
    }
  })
}
export const logout = () => (dispatch: Dispatch<ActionsType>) => {
  authAPI.logout().then(response => {
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false))
    }
  })
}