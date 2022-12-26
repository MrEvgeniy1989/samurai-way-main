import {combineReducers, createStore} from 'redux';
import {profileReducer} from './profile-reducer';
import {dialogsReducer} from './dialogs-reducer';
import {sidebarReducer} from './sidebar-reducer';
import {usersReducer} from './users-reducer';

export type AppStateType = ReturnType<typeof RootReducer>

const RootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer
})

export const store = createStore(RootReducer)
