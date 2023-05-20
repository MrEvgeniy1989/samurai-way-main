import React, {FC} from 'react';
import style from './Login.module.css'
import styleFormControls from '../common/FormsControls/FormsControls.module.css'
import {InjectedFormProps, reduxForm} from 'redux-form';
import {createField, Input} from '../common/FormsControls/FormsControls';
import {required} from '../../utils/validators/validators';
import {connect} from 'react-redux';
import {login} from '../../redux/auth-reducer';
import {Redirect} from 'react-router-dom';
import {AppStateType} from '../../redux/redux-store';

type LoginFormPropsType = {
    captchaUrl: string | null
}

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

export const LoginForm: FC<InjectedFormProps<FormDataType> & LoginFormPropsType> = (
    {
        handleSubmit,
        error,
        captchaUrl
    }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Email', 'email', [required], Input)}
            {createField('Password', 'password', [required], Input, {type: 'password'})}
            {createField(null, 'rememberMe', [], Input, {type: 'checkbox'}, 'Remember me')}

            {captchaUrl && <img src={captchaUrl} alt={'captcha'}/>}
            {captchaUrl && createField('Symbols from image', 'captcha', [required], Input, {})}

            {error && <div className={styleFormControls.formSummaryError}>{error}</div>}

            <div>
                <button>Login</button>
            </div>
        </form>
    )
}


const LoginReduxForm = reduxForm<FormDataType, any>({form: 'login'})(LoginForm)


type MapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string | null
}
type MapDispatchToPropsType = { login: (email: string, password: string, rememberMe: boolean,  captcha: string | null) => void }
type LoginPropsType = MapStateToPropsType & MapDispatchToPropsType

const Login: FC<LoginPropsType> = (props) => {

    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe,  formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div className={style.login}>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login)
