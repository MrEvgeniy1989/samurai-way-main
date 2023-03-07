import React from 'react';
import {InitialStateType, sendMessageCreator, updateNewMessageTextActionCreator} from '../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import { Dispatch } from 'redux';

type MapStateToPropsType = {
    dialogsPage: InitialStateType
    isAuth: boolean
}
type MapDispatchToPropsType = {
    updateNewMessageBody: (body: string) => void
    sendMessage: () => void
}
export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        updateNewMessageBody: (body: string) => {dispatch(updateNewMessageTextActionCreator(body))},
        sendMessage: () => {dispatch(sendMessageCreator())}
    }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)