import { ResultCodeForCaptchaEnum, ResultCodesEnum } from "../api/api";
import { FormAction, stopSubmit } from "redux-form";
import { authAPI } from "../api/auth-api";
import { securityAPI } from "../api/security-api";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null, // if null, then captcha is not required
};

export const authReducer = (state = initialState, action: ActionsType): AuthReducerInitialStateType => {
  switch (action.type) {
    case "SN/auth/SET_USER_DATA":
    case "SN/auth/GET_CAPTCHA_URL_SUCCESS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

// Actions
export const authReducerActions = {
  setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) =>
    ({
      type: "SN/auth/SET_USER_DATA",
      payload: { userId, email, login, isAuth },
    } as const),
  getCaptchaUrlSuccess: (captchaUrl: string) =>
    ({
      type: "SN/auth/GET_CAPTCHA_URL_SUCCESS",
      payload: { captchaUrl },
    } as const),
};

// Thunks
export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let data = await authAPI.me();
  if (data.resultCode === ResultCodesEnum.Success) {
    let { id, email, login } = data.data;
    dispatch(authReducerActions.setAuthUserData(id, email, login, true));
  }
};

export const login =
  (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType =>
  async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha);

    if (data.resultCode === ResultCodesEnum.Success) {
      // success, get auth data
      await dispatch(getAuthUserData());
    } else {
      if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
        await dispatch(getCaptchaUrl());
      }
      let message = data.messages.length > 0 ? data.messages[0] : "Some error";
      dispatch(stopSubmit("login", { _error: message }));
    }
  };

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl();
  const captchaUrl = data.url;
  dispatch(authReducerActions.getCaptchaUrlSuccess(captchaUrl));
};

export const logout = (): ThunkType => async (dispatch) => {
  let data = await authAPI.logout();

  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(authReducerActions.setAuthUserData(null, null, null, false));
  }
};

// Types
type AuthReducerInitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof authReducerActions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;
