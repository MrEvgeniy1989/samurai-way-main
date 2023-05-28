import React from "react";
import s from "./Header.module.css";
import { Link } from "react-router-dom";
import { selectCurrentUserLogin, selectIsAuth } from "../../redux/auth-selectors";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth-reducer";
import { Avatar, Button, Layout, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";

type PropsType = {};

export const Header: React.FC<PropsType> = () => {
  const isAuth = useSelector(selectIsAuth);
  const login = useSelector(selectCurrentUserLogin);

  const dispatch = useDispatch();

  const logoutCallback = () => {
    dispatch(logout());
  };

  const { Header } = Layout;

  return (
    <Header className={s.header}>
      {/*<Col span={18}>*/}
      {/*  <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>*/}
      {/*    <Menu.Item key="1">*/}
      {/*      <Link to="/developers">Developers</Link>*/}
      {/*    </Menu.Item>*/}
      {/*  </Menu>*/}
      {/*</Col>*/}
      <div className={s.headerContainer}>
        <Row>
          {isAuth ? (
            <div className={s.loginBlock}>
              <Avatar alt={login || ""} style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
              <Button onClick={logoutCallback}>Log out</Button>
            </div>
          ) : (
            <div className={s.logoutBlock}>
              <Button>
                <Link to={"/login"}>Login</Link>
              </Button>
            </div>
          )}
        </Row>
      </div>
    </Header>

    // <header className={s.header}>
    //   <img
    //     src="https://play-lh.googleusercontent.com/DTzWtkxfnKwFO3ruybY1SKjJQnLYeuK3KmQmwV5OQ3dULr5iXxeEtzBLceultrKTIUTr"
    //     alt="Logo"
    //   />
    //
    //   <div className={s.loginBlock}>
    //     {isAuth ? (
    //       <div>
    //         {login} - <button onClick={logoutCallback}>Log out</button>{" "}
    //       </div>
    //     ) : (
    //       <NavLink to={"/login"}>Login</NavLink>
    //     )}
    //   </div>
    // </header>
  );
};

/*
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { HeaderContainerPropsType } from "./HeaderContainer";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Col, Layout, Menu, Row } from "antd";
import { logout } from "../../redux/auth-reducer";
import { AppStateType } from "../../redux/redux-store";
import { UserOutlined } from "@ant-design/icons";

type HeaderPropsType = HeaderContainerPropsType;

export type MapPropsType = {};

export const Header: React.FC<MapPropsType> = (props) => {
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const login = useSelector((state: AppStateType) => state.auth.login);

  const dispatch = useDispatch();

  const logoutCallback = () => {
    dispatch(logout());
  };

  const { Header } = Layout;

  return (
    <Header className="header">
      <Row>
        <Col span={18}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1">
              <Link to="/developers">Developers</Link>
            </Menu.Item>
          </Menu>
        </Col>

        {isAuth ? (
          <>
            {" "}
            <Col span={1}>
              <Avatar alt={login || ""} style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
            </Col>
            <Col span={5}>
              <Button onClick={logoutCallback}>Log out</Button>
            </Col>
          </>
        ) : (
          <Col span={6}>
            <Button>
              <Link to={"/login"}>Login</Link>
            </Button>
          </Col>
        )}
      </Row>
    </Header>
  );
};
*/
