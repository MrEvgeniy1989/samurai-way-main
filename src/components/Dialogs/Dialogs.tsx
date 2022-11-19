import React from 'react';
import s from './Dialogs.module.css'
import {NavLink} from 'react-router-dom';

type DialogItemPropsType = {
    name: string
    id: string
}

const DialogItem: React.FC<DialogItemPropsType> = (props) => {
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={'/dialogs/' + props.id}>{props.name}</NavLink>
        </div>
    )
}

type MessagePropsType = {
    message: string
}

const Message: React.FC<MessagePropsType> = (props) => {
  return (
      <div className={s.message}>{props.message}</div>
  )
}

export const Dialogs = (props: any) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <DialogItem name="Evgenii" id="1"/>
                <DialogItem name="Dimych" id="2"/>
                <DialogItem name="Andrey" id="3"/>
                <DialogItem name="Sveta" id="4"/>
                <DialogItem name="Sasha" id="5"/>
                <DialogItem name="Victor" id="6"/>
                <DialogItem name="Valera" id="7"/>
            </div>
            <div className={s.messages}>
                <Message message="Hi"/>
                <Message message="How is your it-kamasutra?"/>
                <Message message="Yo"/>
                <Message message="Yo"/>
                <Message message="Yo"/>
            </div>
        </div>
    )
}