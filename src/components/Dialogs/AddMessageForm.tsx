import React, { FC } from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, Textarea } from "../common/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../../utils/validators/validators";

const maxLength50 = maxLengthCreator(50);

const AddMessageForm: FC<InjectedFormProps<FormDataType, AddMessageFormPropsType> & AddMessageFormPropsType> = (
  props
) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField<NewMessageFormValuesKeysType>(
          "Enter your message",
          "newMessageBody",
          [required, maxLength50],
          Textarea
        )}
        {/*        <Field
          component={Textarea}
          name={"newMessageBody"}
          placeholder={"Enter your message"}
          validate={[required, maxLength50]}
        />*/}
      </div>

      <div>
        <button>Send</button>
      </div>
    </form>
  );
};

export default reduxForm<FormDataType>({ form: "dialogAddMessageForm" })(AddMessageForm);

// Types
type AddMessageFormPropsType = {};
export type FormDataType = { newMessageBody: string };
type NewMessageFormValuesKeysType = Extract<keyof FormDataType, string>;
