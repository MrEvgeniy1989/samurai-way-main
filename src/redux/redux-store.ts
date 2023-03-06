import {applyMiddleware, combineReducers, createStore} from 'redux';
import {profileReducer} from './profile-reducer';
import {dialogsReducer} from './dialogs-reducer';
import {sidebarReducer} from './sidebar-reducer';
import {usersReducer} from './users-reducer';
import {authReducer} from './auth-reducer';
import thunkMiddleware from 'redux-thunk';

export type AppStateType = ReturnType<typeof RootReducer>

const RootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer,
    auth: authReducer
})

export const store = createStore(RootReducer, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store
