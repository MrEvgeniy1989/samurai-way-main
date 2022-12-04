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


export let state: RootStateType = {
    profilePage: {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 15},
            {id: 2, message: 'It\'s my first post', likesCount: 20},
        ],
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
}

export let addPost = (postMessage: string) => {
    const newPost: PostDataType = {
        id: 5,
        message: postMessage,
        likesCount: 0,
    }
    state.profilePage.posts.push(newPost)
}