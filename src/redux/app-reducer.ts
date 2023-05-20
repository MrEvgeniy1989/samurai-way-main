import {ThunkDispatch} from 'redux-thunk';
import {getAuthUserData} from './auth-reducer';

type InitialStateType = {
    initialized: boolean
    globalError: string | null
}
type ActionsType = ReturnType<typeof initializedSuccess>

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialState: InitialStateType = {
    initialized: false,
    globalError: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {...state, initialized: true}
        default:
            return state
    }
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS}) as const

export const initializeApp = () => (dispatch: ThunkDispatch<InitialStateType, any, ActionsType>) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}