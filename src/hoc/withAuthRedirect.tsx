import React, { ComponentType } from "react";
import { Redirect } from "react-router-dom";
import { AppStateType } from "../redux/redux-store";
import { connect } from "react-redux";

let mapStateToPropsForRedirect = (state: AppStateType): MapStateToPropsType => ({
  isAuth: state.auth.isAuth,
});

export function withAuthRedirect<T>(Component: ComponentType<T>): ComponentType<T> {
  const RedirectComponent = (props: MapStateToPropsType) => {
    let { isAuth, ...restProps } = props;
    if (!props.isAuth) return <Redirect to={"/login"} />;
    return <Component {...(restProps as T)} />;
  };

  return connect<MapStateToPropsType, MapDispatchToPropsType, T, AppStateType>(
    mapStateToPropsForRedirect,
    {}
  )(RedirectComponent);
}

// Types
type MapStateToPropsType = { isAuth: boolean };
type MapDispatchToPropsType = {};
