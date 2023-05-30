import React, { ComponentType } from 'react';
import './App.css';
import { HashRouter, Link, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import { AppStateType, store } from './redux/redux-store';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer';
import { Preloader } from './components/common/Preloader/Preloader';
import { withSuspense } from './hoc/withSuspense';
import 'antd/dist/antd.css';

import { Breadcrumb, Layout, Menu } from 'antd';
import { LaptopOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import { Header } from './components/Header/Header';

// const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const UsersPage = React.lazy(() =>
  import('./components/Users/UsersContainer').then(module => ({ default: module.UsersPage })),
);
const News = React.lazy(() => import('./components/News/News').then(module => ({ default: module.News })));
const Music = React.lazy(() => import('./components/Music/Music').then(module => ({ default: module.Music })));
const Settings = React.lazy(() =>
  import('./components/Settings/Settings').then(module => ({ default: module.Settings })),
);
const LoginPage = React.lazy(() =>
  import('./components/Login/LoginPage').then(module => ({ default: module.LoginPage })),
);
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage').then(module => ({ default: module.ChatPage })));

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);
const SuspendedUser = withSuspense(UsersPage);
const SuspendedNews = withSuspense(News);
const SuspendedMusic = withSuspense(Music);
const SuspendedSettings = withSuspense(Settings);
const SuspendedLogin = withSuspense(LoginPage);
const SuspendedChatPage = withSuspense(ChatPage);

class App extends React.Component<AppPropsType, AppStateType> {
  catchAllUnhandledErrors = () => {
    alert('Some error occured, please try again later');
  };

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <Layout className="layout">
        <Header />
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Profile</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                /*  defaultSelectedKeys={['7']}*/
                /*  defaultOpenKeys={['sub1']}*/
                style={{ height: '100%' }}
              >
                <Menu.Item key="1" icon={<UserOutlined />}>
                  <Link to="/profile">Profile</Link>
                </Menu.Item>

                <Menu.Item key="2" icon={<MessageOutlined />}>
                  <Link to="/dialogs">Messages</Link>
                </Menu.Item>

                <Menu.Item key="3" icon={<LaptopOutlined />}>
                  <Link to="/developers">Developers</Link>
                </Menu.Item>

                <Menu.Item key="9">
                  <Link to="/chat">Chat</Link>
                </Menu.Item>

                <Menu.Item key="4">
                  <Link to="/news">News</Link>
                </Menu.Item>

                <Menu.Item key="5">
                  <Link to="/music">Music</Link>
                </Menu.Item>

                <Menu.Item key="6">
                  <Link to="/settings">Settings</Link>
                </Menu.Item>

                {/*<SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">*/}
                {/*  <Menu.Item key="9">option9</Menu.Item>*/}
                {/*  <Menu.Item key="10">option10</Menu.Item>*/}
                {/*  <Menu.Item key="11">option11</Menu.Item>*/}
                {/*  <Menu.Item key="12">option12</Menu.Item>*/}
                {/*</SubMenu>*/}
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Switch>
                <Route exact path="/" render={() => <Redirect to={'/profile'} />} />
                <Route path="/profile/:userId?" render={() => <SuspendedProfile />} />
                <Route path="/dialogs" render={() => <SuspendedDialogs />} />
                <Route path="/developers" render={() => <SuspendedUser pageTitle={'Самураи'} />} />
                <Route path="/news" render={() => <SuspendedNews />} />
                <Route path="/music" render={() => <SuspendedMusic />} />
                <Route path="/settings" render={() => <SuspendedSettings />} />
                <Route path="/login" render={() => <SuspendedLogin />} />
                <Route path="/chat" render={() => <SuspendedChatPage />} />
                <Route path="*" render={() => <div>404 NOT FOUND</div>} />
              </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Samurai Social Network ©2023 Created by Evgenii</Footer>
      </Layout>
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
