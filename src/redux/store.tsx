import {addPostActionCreator, profileReducer, updateNewPostTextActionCreator} from './profile-reducer';
import {dialogsReducer, sendMessageCreator, updateNewMessageTextActionCreator} from './dialogs-reducer';
import {sidebarReducer} from './sidebar-reducer';

type PostDataType = {
    id: number
    message: string
    likesCount: number
}
type DialogsDataType = {
    id: number
    name: string
}
type MessagesDataType = {
    id: number
    message: string
}
type ProfilePageType = {
    posts: PostDataType[]
    newPostText: string
}
type DialogsPageType = {
    dialogs: DialogsDataType[]
    messages: MessagesDataType[]
    newMessageText: string
}
export type SidebarType = {}
export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
}
export type StoreType = {
    _state: RootStateType
    _callSubscriber: (state: RootStateType) => void
    getState: () => RootStateType
    subscribe: (observer: (state: RootStateType) => void) => void
    dispatch: (action: ActionsType) => void
}
export type ActionsType =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof updateNewPostTextActionCreator>
    | ReturnType<typeof sendMessageCreator>
    | ReturnType<typeof updateNewMessageTextActionCreator>


export const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 15},
                {id: 2, message: 'It\'s my first post', likesCount: 20},
            ],
            newPostText: ''
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Evgenii',},
                {id: 2, name: 'Dimych',},
                {id: 3, name: 'Andrey',},
                {id: 4, name: 'Sveta',},
                {id: 5, name: 'Sasha',},
                {id: 6, name: 'Victor',},
                {id: 7, name: 'Valera',},
            ],
            messages: [
                {id: 1, message: 'Hi',},
                {id: 2, message: 'How is your it-kamasutra?',},
                {id: 3, message: 'Yo',},
                {id: 4, message: 'Yo',},
                {id: 5, message: 'Yo',},
            ],
            newMessageText: ''
        },
        sidebar: {}
    },
    _callSubscriber(state: RootStateType) {
        console.log('State changed')
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)

        this._callSubscriber(this._state)
    }
}