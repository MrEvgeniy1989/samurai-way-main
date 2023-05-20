import React, {ComponentType} from 'react';
import './App.css';
import {Navbar} from './components/Navbar/Navbar';
import {HashRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import {connect, Provider} from 'react-redux';
import {AppStateType, store} from './redux/redux-store';
import {compose} from 'redux';
import {initializeApp} from './redux/app-reducer';
import {Preloader} from './components/common/Preloader/Preloader';


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))
const News = React.lazy(() => import('./components/News/News').then(module => ({default: module.News})))
const Music = React.lazy(() => import('./components/Music/Music').then(module => ({default: module.Music})))
const Settings = React.lazy(() => import('./components/Settings/Settings').then(module => ({default: module.Settings})))
const Login = React.lazy(() => import('./components/Login/Login'))


type MapStateToPropsType = {
    initialized: boolean
}
type MapDispatchToPropsType = {
    initializeApp: () => void
}
type AppPropsType = MapStateToPropsType & MapDispatchToPropsType


class App extends React.Component<AppPropsType, AppStateType> {
    catchAllUnhandledErrors = (reason?: any, promise?: Promise<any>) => {
        alert('Some error occured, please try again later')
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <div className={'appContainer'}>
                    <Navbar/>
                    <div className="app-wrapper-content">
                        <Switch>
                            <Route exact path="/" render={() => <Redirect to={'/profile'}/>}/>
                            <Route path="/profile/:userId?" render={() => {
                                return <React.Suspense fallback={<Preloader/>}><ProfileContainer/></React.Suspense>
                            }}/>
                            <Route path="/dialogs" render={() => {
                                return <React.Suspense fallback={<Preloader/>}><DialogsContainer/></React.Suspense>
                            }}/>
                            <Route path="/users" render={() => {
                                return <React.Suspense fallback={<Preloader/>}><UsersContainer/></React.Suspense>
                            }}/>
                            <Route path="/news" render={() => {
                                return <React.Suspense fallback={<Preloader/>}><News/></React.Suspense>
                            }}/>
                            <Route path="/music" render={() => {
                                return <React.Suspense fallback={<Preloader/>}><Music/></React.Suspense>
                            }}/>
                            <Route path="/settings" render={() => {
                                return <React.Suspense fallback={<Preloader/>}><Settings/></React.Suspense>
                            }}/>
                            <Route path="/login" render={() => {
                                return <React.Suspense fallback={<Preloader/>}><Login/></React.Suspense>
                            }}/>
                            <Route path="*"
                                   render={() => <div>404 NOT FOUND</div>}/>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

let AppContainer = compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App)

const SamuraiJSApp = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </HashRouter>
    )
}

export default SamuraiJSApp;