import React, {FC} from 'react';
import style from './Login.module.css'
import {Field, InjectedFormProps, reduxForm} from 'redux-form';

type LoginFormPropsType = {}

type FormDataType = {
  login: string
  password: string
  rememberMe: boolean
}

export const LoginForm: FC<InjectedFormProps<FormDataType> & LoginFormPropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field placeholder={'Login'} name={'login'} component={'input'}/>
      </div>

      <div>
        <Field placeholder={'Password'} name={'password'} component={'input'}/>
      </div>

      <div>
        <Field component={'input'} name={'rememberMe'} type="checkbox"/> Remember me
      </div>

      <div>
        <button>Login</button>
      </div>
    </form>
  )
}


const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)


type LoginPropsType = {}

export const Login: FC<LoginPropsType> = (props) => {

  const onSubmit = (formData: FormDataType) => {
    console.log(formData)
  }

  return (
    <div className={style.login}>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit}/>
    </div>
  )
}

