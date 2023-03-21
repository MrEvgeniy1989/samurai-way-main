import React, {FC, HTMLInputTypeAttribute} from 'react';
import style from './FormsControls.module.css'
import {WrappedFieldInputProps, WrappedFieldMetaProps} from 'redux-form';

type FormsControlsPropsType = {
  input: WrappedFieldInputProps
  meta: WrappedFieldMetaProps
  placeholder?: string
  type?: HTMLInputTypeAttribute
  autoFocus?: boolean
}

const FormControl: FC<FormsControlsPropsType> = ({input, meta, ...props}) => {
  const hasError = meta.touched && meta.error
  return (
    <div className={`${style.formControl} (${hasError} ? ${style.error} : '')`}>
      <div>
        {props.children}
      </div>
      {hasError && <span>{meta.error}</span>}
    </div>
  )
}

export const Textarea: FC<FormsControlsPropsType> = (props) => {
  const {input, meta, ...restProps} = props
  return <FormControl {...props} ><textarea {...input} {...restProps}/></FormControl>
}

export const Input: FC<FormsControlsPropsType> = (props) => {
  const {input, meta, ...restProps} = props
  return <FormControl {...props} ><input {...input} {...restProps}/></FormControl>
}