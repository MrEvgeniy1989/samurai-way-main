import React from 'react';
import s from './Dialogs.module.css'
import {NavLink} from 'react-router-dom';

type DialogItemPropsType = {
    id: number
    name: string
}
export type MessagePropsType = {
    message: string
}
export type dialogsDataType = {
    id: number
    name: string
}
export type messagesDataType = {
    id: number
    message: string
}

const DialogItem: React.FC<DialogItemPropsType> = (props) => {
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={'/dialogs/' + props.id}>{props.name}</NavLink>
        </div>
    )
}

const Message: React.FC<MessagePropsType> = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

export const Dialogs = (props: any) => {

    let dialogs: dialogsDataType[] = [
        {id: 1, name: 'Evgenii',},
        {id: 2, name: 'Dimych',},
        {id: 3, name: 'Andrey',},
        {id: 4, name: 'Sveta',},
        {id: 5, name: 'Sasha',},
        {id: 6, name: 'Victor',},
        {id: 7, name: 'Valera',},
    ]

    let messages: messagesDataType[] = [
        {id: 1, message: 'Hi',},
        {id: 2, message: 'How is your it-kamasutra?',},
        {id: 3, message: 'Yo',},
        {id: 4, message: 'Yo',},
        {id: 5, message: 'Yo',},
    ]

    let dialogsElements = dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = messages.map(m => <Message message={m.message}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    )
}