import React, {FC} from 'react';
import style from './Login.module.css'
import styleFormControls from '../common/FormsControls/FormsControls.module.css'
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {createField, Input} from '../common/FormsControls/FormsControls';
import {required} from '../../utils/validators/validators';
import {connect} from 'react-redux';
import {login} from '../../redux/auth-reducer';
import {Redirect} from 'react-router-dom';
import {AppStateType} from '../../redux/redux-store';

type LoginFormPropsType = {}

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export const LoginForm: FC<InjectedFormProps<FormDataType> & LoginFormPropsType> = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Email', 'email', [required], Input)}
            {createField('Password', 'password', [required], Input, {type: 'password'})}
            {createField(null, 'rememberMe', [], Input, {type: 'checkbox'}, 'Remember me')}

            <div>
                <Field component={Input}
                       name={'rememberMe'}
                       type="checkbox"
                /> Remember me
            </div>

            {error && <div className={styleFormControls.formSummaryError}>{error}</div>}

            <div>
                <button>Login</button>
            </div>
        </form>
    )
}


const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)


type MapStateToPropsType = {
    isAuth: boolean
}
type MapDispatchToPropsType = { login: (email: string, password: string, rememberMe: boolean) => void }
type LoginPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

const Login: FC<LoginPropsType> = (props) => {

    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div className={style.login}>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

export default connect(mapStateToProps, {login})(Login)
