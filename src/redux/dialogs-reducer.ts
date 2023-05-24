import { InferActionsTypes } from "./redux-store";

const initialState = {
  dialogs: [
    { id: 1, name: "Evgenii" },
    { id: 2, name: "Dimych" },
    { id: 3, name: "Andrey" },
    { id: 4, name: "Sveta" },
    { id: 5, name: "Sasha" },
    { id: 6, name: "Victor" },
    { id: 7, name: "Valera" },
  ] as DialogType[],
  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "How is your it-kamasutra?" },
    { id: 3, message: "Yo" },
    { id: 4, message: "Yo" },
    { id: 5, message: "Yo" },
  ] as MessageType[],
};

export const dialogsReducer = (state = initialState, action: ActionsType): DialogsInitialStateType => {
  switch (action.type) {
    case "SN/DIALOGS/SEND_MESSAGE":
      let body = action.newMessageBody;
      return { ...state, messages: [...state.messages, { id: 6, message: body }] };
    default:
      return state;
  }
};

export const dialogsReducerAtions = {
  sendMessage: (newMessageBody: string) => ({ type: "SN/DIALOGS/SEND_MESSAGE", newMessageBody } as const),
};

// Types
export type DialogsInitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof dialogsReducerAtions>;
// type ThunkType = BaseThunkType<ActionsType>;
type DialogType = { id: number; name: string };
type MessageType = { id: number; message: string };
