import React, { FC } from 'react';
import s from './Dialogs.module.css';
import { DialogItem } from './DialogItem/DialogItem';
import { Message } from './Message/Message';
import { DialogsPropsType } from './DialogsContainer';
import AddMessageForm, { FormDataType } from './AddMessageForm';

export const Dialogs: FC<DialogsPropsType> = props => {
  const state = props.dialogsPage;

  const dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
  const messagesElements = state.messages.map(m => <Message message={m.message} key={m.id} />);

  const addNewMessage = (formData: FormDataType) => {
    props.sendMessage(formData.newMessageBody);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
        <AddMessageForm onSubmit={addNewMessage} />
      </div>
    </div>
  );
};
