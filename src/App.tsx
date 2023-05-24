import React, { ComponentType } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { HashRouter, Redirect, Route, Switch, withRouter } from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import { connect, Provider } from "react-redux";
import { AppStateType, store } from "./redux/redux-store";
import { compose } from "redux";
import { initializeApp } from "./redux/app-reducer";
import { Preloader } from "./components/common/Preloader/Preloader";
import { withSuspense } from "./hoc/withSuspense";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));
const News = React.lazy(() => import("./components/News/News").then((module) => ({ default: module.News })));
const Music = React.lazy(() => import("./components/Music/Music").then((module) => ({ default: module.Music })));
const Settings = React.lazy(() =>
  import("./components/Settings/Settings").then((module) => ({ default: module.Settings }))
);
const Login = React.lazy(() => import("./components/Login/Login"));

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);
const SuspendedUser = withSuspense(UsersContainer);
const SuspendedNews = withSuspense(News);
const SuspendedMusic = withSuspense(Music);
const SuspendedSettings = withSuspense(Settings);
const SuspendedLogin = withSuspense(Login);

// const SuspendedChatPage = withSuspense(ChatPage)

class App extends React.Component<AppPropsType, AppStateType> {
  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert("Some error occured, please try again later");
  };

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <div className={"appContainer"}>
          <Navbar />
          <div className="app-wrapper-content">
            <Switch>
              <Route exact path="/" render={() => <Redirect to={"/profile"} />} />
              <Route path="/profile/:userId?" render={() => <SuspendedProfile />} />
              <Route path="/dialogs" render={() => <SuspendedDialogs />} />
              <Route path="/users" render={() => <SuspendedUser />} />
              <Route path="/news" render={() => <SuspendedNews />} />
              <Route path="/music" render={() => <SuspendedMusic />} />
              <Route path="/settings" render={() => <SuspendedSettings />} />
              <Route path="/login" render={() => <SuspendedLogin />} />
              <Route path="*" render={() => <div>404 NOT FOUND</div>} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: AppStateType) => ({ initialized: state.app.initialized });
let AppContainer = compose<ComponentType>(withRouter, connect(mapStateToProps, { initializeApp }))(App);

const SamuraiJSApp = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>
  );
};
export default SamuraiJSApp;

// Types
// type MapStateToPropsType = { initialized: boolean };
type MapStateToPropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchToPropsType = { initializeApp: () => void };
type AppPropsType = MapStateToPropsType & MapDispatchToPropsType;
