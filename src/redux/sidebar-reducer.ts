import { InferActionsTypes } from "./redux-store";

const initialState = {};

export const sidebarReducer = (state = initialState, action: ActionsType): SidebarReducerInitialStateType => {
  return state;
};

// Actions
export const sidebarReducerActions = {};

// Types
export type SidebarReducerInitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof sidebarReducerActions>;
// type ThunkType = BaseThunkType<ActionsType>;
