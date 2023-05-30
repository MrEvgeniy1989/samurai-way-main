import { getAuthUserData } from './auth-reducer';
import { BaseThunkType, InferActionsTypes } from './redux-store';

const initialState = {
  initialized: false,
};

export const appReducer = (state = initialState, action: ActionsType): AppReducerInitialStateType => {
  switch (action.type) {
    case 'SN/APP/INITIALIZED_SUCCESS':
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

//Actions
const appReducerActions = {
  initializedSuccess: () => ({ type: 'SN/APP/INITIALIZED_SUCCESS' } as const),
};

// Thunks
export const initializeApp = (): ThunkType => dispatch => {
  let promise = dispatch(getAuthUserData());
  Promise.all([promise]).then(() => {
    dispatch(appReducerActions.initializedSuccess());
  });
};

export type AppReducerInitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof appReducerActions>;
type ThunkType = BaseThunkType<ActionsType, void>;
