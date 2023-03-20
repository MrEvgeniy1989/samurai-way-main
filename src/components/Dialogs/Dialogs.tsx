import React, {FC} from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {DialogsPropsType} from './DialogsContainer';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';

export const Dialogs = (props: DialogsPropsType) => {
  const state = props.dialogsPage

  const dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>)
  const messagesElements = state.messages.map(m => <Message message={m.message} key={m.id}/>)


  const addNewMessage = (formData: FormDataType) => {
    props.sendMessage(formData.newMessageBody)
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {dialogsElements}
      </div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
        <AddMessageFormRedux onSubmit={addNewMessage}/>
      </div>
    </div>
  )
}


type AddMessageFormPropsType = {

}

type FormDataType = {
  newMessageBody: string
}

const AddMessageForm: FC<InjectedFormProps<FormDataType> & AddMessageFormPropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={'textarea'} name={'newMessageBody'} placeholder={'Enter your message'}/>
      </div>

      <div>
        <button>Send</button>
      </div>
    </form>
  )
}

const AddMessageFormRedux = reduxForm<FormDataType>({form: 'dialogAddMessageForm'})(AddMessageForm)