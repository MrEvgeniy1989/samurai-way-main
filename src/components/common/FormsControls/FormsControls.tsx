import React, { FC } from "react";
import style from "./FormsControls.module.css";
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import { FieldValidatorType } from "../../../utils/validators/validators";

type FormsControlsPropsType = {
  meta: WrappedFieldMetaProps;
  //   input: WrappedFieldInputProps;
  //   // placeholder?: string;
  //   // type?: HTMLInputTypeAttribute;
  //   // autoFocus?: boolean;
};

const FormControl: FC<FormsControlsPropsType> = ({ meta: { touched, error }, children }) => {
  const hasError = touched && error;
  return (
    <div className={style.formControl + " " + (hasError ? style.error : "")}>
      <div>{children}</div>
      {hasError && <span>{error}</span>}
    </div>
  );
};

export const Textarea: FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};

export const Input: FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};

export function createField<FormKeysType extends string>(
  placeholder: string | undefined,
  name: FormKeysType,
  validators: FieldValidatorType[],
  component: FC<WrappedFieldProps>,
  props: any = {},
  text: string = ""
) {
  return (
    <div>
      <Field placeholder={placeholder} name={name} validate={validators} component={component} {...props} /> {text}
    </div>
  );
}
