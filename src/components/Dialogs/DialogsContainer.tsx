import React from 'react';
import {sendMessageCreator, updateNewMessageTextActionCreator} from '../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';

type DialogsContainerPropsType = {
    store: any
}

export const DialogsContainer: React.FC<DialogsContainerPropsType> = (props) => {

    const onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator())
    }
    const onNewMessageChange = (body: string) => {
        props.store.dispatch(updateNewMessageTextActionCreator(body))
    }

    return <Dialogs updateNewMessageBody={onNewMessageChange} sendMessage={onSendMessageClick} dialogsPage={props.store.getState().dialogsPage}/>
}