export type PostDataType = {
    id: number
    message: string
    likesCount: number
}
export type DialogsDataType = {
    id: number
    name: string
}
export type MessagesDataType = {
    id: number
    message: string
}
export type ProfilePageType = {
    posts: PostDataType[]
    newPostText: string
}
export type DialogsPageType = {
    dialogs: DialogsDataType[]
    messages: MessagesDataType[]
}
export type SidebarType = {}
export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
}
export type StoreType = {
    _state: RootStateType
    getState: () => RootStateType
    _callSubscriber: (state: RootStateType) => void
    addPost: () => void
    updateNewPostText: (newText: string) => void
    subscribe: (observer: (state: RootStateType) => void) => void
}

export const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 15},
                {id: 2, message: 'It\'s my first post', likesCount: 20},
            ],
            newPostText: 'it-kamasutra'
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
        },
        sidebar: {}
    },
    getState() {
      return this._state
    },
    _callSubscriber(state: RootStateType) {
        console.log('State changed')
    },
    addPost() {
        const newPost: PostDataType = {
            id: 5,
            message: this._state.profilePage.newPostText,
            likesCount: 0,
        }
        this._state.profilePage.posts.push(newPost)
        this._state.profilePage.newPostText = ''
        this._callSubscriber(this._state)
    },
    updateNewPostText(newText: string) {
        store['_state'].profilePage.newPostText = newText
        this._callSubscriber(store['_state'])
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
}