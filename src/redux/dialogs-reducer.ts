type DialogType = {
    id: number
    name: string
}
type MessageType = {
    id: number
    message: string
}
// export type InitialStateType = {
//     dialogs: DialogType[]
//     messages: MessageType[]
// }
export type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof sendMessageCreator>

const SEND_MESSAGE = 'SEND_MESSAGE';

const initialState = {
    dialogs: [
        {id: 1, name: 'Evgenii',},
        {id: 2, name: 'Dimych',},
        {id: 3, name: 'Andrey',},
        {id: 4, name: 'Sveta',},
        {id: 5, name: 'Sasha',},
        {id: 6, name: 'Victor',},
        {id: 7, name: 'Valera',},
    ] as DialogType[],
    messages: [
        {id: 1, message: 'Hi',},
        {id: 2, message: 'How is your it-kamasutra?',},
        {id: 3, message: 'Yo',},
        {id: 4, message: 'Yo',},
        {id: 5, message: 'Yo',},
    ] as MessageType[]
}

export const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody
            return {...state, messages: [...state.messages, {id: 6, message: body}]}
        default:
            return state
    }
}

// Actions
export const sendMessageCreator = (newMessageBody: string) => ({type: SEND_MESSAGE, newMessageBody}) as const