import React from 'react';
import {sendMessageCreator, updateNewMessageTextActionCreator} from '../../redux/dialogs-reducer';
import {StoreContext} from '../../StoreContext';
import {Dialogs} from './Dialogs';

type DialogsContainerPropsType = {
    // store: any
}

export const DialogsContainer: React.FC<DialogsContainerPropsType> = (props) => {
    return (
        <StoreContext.Consumer>
            {store => {
                const onSendMessageClick = () => {
                    store.dispatch(sendMessageCreator())
                }
                const onNewMessageChange = (body: string) => {
                    store.dispatch(updateNewMessageTextActionCreator(body))
                }

                return <Dialogs updateNewMessageBody={onNewMessageChange}
                                sendMessage={onSendMessageClick}
                                dialogsPage={store.getState().dialogsPage}/>
            }
        }
        </StoreContext.Consumer>
    );
}