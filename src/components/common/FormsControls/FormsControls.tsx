import React, {FC, HTMLInputTypeAttribute} from 'react';
import style from './FormsControls.module.css'
import {Field, WrappedFieldInputProps, WrappedFieldMetaProps} from 'redux-form';

type FormsControlsPropsType = {
    input: WrappedFieldInputProps
    meta: WrappedFieldMetaProps
    placeholder?: string
    type?: HTMLInputTypeAttribute
    autoFocus?: boolean
}

const FormControl: FC<FormsControlsPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error
    return (
        <div className={style.formControl + ' ' + (hasError ? style.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
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

export const createField = (placeholder: string | null, name: string, validators: any, component: FC<FormsControlsPropsType>, props: any = {}, text: string = '') => (
    <div>
        <Field placeholder={placeholder}
               name={name}
               validate={validators}
               component={component}
               {...props}
        /> {text}
    </div>
)