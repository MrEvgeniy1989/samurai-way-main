import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import {
  addPostActionCreator,
  deletePost,
  profileReducer,
  savePhotoSuccess,
  setStatus,
  setUserProfile,
} from "./profile-reducer";
import { dialogsReducer, sendMessageCreator } from "./dialogs-reducer";
import { sidebarReducer } from "./sidebar-reducer";
import {
  followSuccess,
  setCurrentPage,
  setTotalUsersCount,
  setUsers,
  toggleFollowingProgress,
  toggleIsFetching,
  unfollowSuccess,
  usersReducer,
} from "./users-reducer";
import { authReducer, setAuthUserData } from "./auth-reducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import { FormAction, reducer as formReducer } from "redux-form";
import { appReducer, initializedSuccess } from "./app-reducer";

export type AppStateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  sidebar: sidebarReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export type ActionsTypes =
  | ReturnType<typeof addPostActionCreator>
  | ReturnType<typeof setUserProfile>
  | ReturnType<typeof setStatus>
  | ReturnType<typeof deletePost>
  | ReturnType<typeof savePhotoSuccess>
  | ReturnType<typeof setAuthUserData>
  | FormAction
  | ReturnType<typeof followSuccess>
  | ReturnType<typeof unfollowSuccess>
  | ReturnType<typeof setUsers>
  | ReturnType<typeof setCurrentPage>
  | ReturnType<typeof setTotalUsersCount>
  | ReturnType<typeof toggleIsFetching>
  | ReturnType<typeof toggleFollowingProgress>
  | ReturnType<typeof initializedSuccess>
  | ReturnType<typeof sendMessageCreator>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ActionsTypes>;

// @ts-ignore
window.__store__ = store;
