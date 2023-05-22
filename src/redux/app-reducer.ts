import {ThunkDispatch} from 'redux-thunk';
import {getAuthUserData} from './auth-reducer';

// type InitialStateType = {
//     initialized: boolean
// }
type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof initializedSuccess>

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialState = {
    initialized: false
}

export const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {...state, initialized: true}
        default:
            return state
    }
}

// Actions
export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS}) as const

// Thunks
export const initializeApp = () => (dispatch: ThunkDispatch<InitialStateType, any, ActionsType>) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}