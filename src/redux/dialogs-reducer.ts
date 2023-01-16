import {addPostActionCreator, setUserProfile, updateNewPostTextActionCreator} from './profile-reducer';


type DialogsDataType = {
    id: number
    name: string
}
type MessagesDataType = {
    id: number
    message: string
}
export type InitialStateType = {
    dialogs: DialogsDataType[]
    messages: MessagesDataType[]
    newMessageText: string
}

type ActionsType =
    ReturnType<typeof sendMessageCreator>
    | ReturnType<typeof updateNewMessageTextActionCreator>

const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT';
const SEND_MESSAGE = 'SEND_MESSAGE';

const initialState: InitialStateType = {
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
}

export const dialogsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_TEXT:
            return  {...state, newMessageText: action.body}
        case SEND_MESSAGE:
            let body = state.newMessageText
            return {...state, newMessageText: '', messages: [...state.messages, {id: 6, message: body}]}
        default:
            return state
    }
}

export const sendMessageCreator = () => ({type: SEND_MESSAGE}) as const
export const updateNewMessageTextActionCreator = (body: string) => ({type: UPDATE_NEW_MESSAGE_TEXT, body: body}) as const