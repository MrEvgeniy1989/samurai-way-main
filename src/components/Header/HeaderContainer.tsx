import React from "react";
import { Header } from "./Header";
import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer";
import { AppStateType } from "../../redux/redux-store";

class HeaderContainer extends React.Component<HeaderContainerPropsType, AppStateType> {
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, { logout })(
  HeaderContainer
);

// Types
type MapStateToPropsType = { isAuth: boolean; login: string | null };
type MapDispatchToPropsType = { logout: () => void };
export type HeaderContainerPropsType = MapStateToPropsType & MapDispatchToPropsType;
