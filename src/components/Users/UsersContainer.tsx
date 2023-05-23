import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { follow, requestUsers, setCurrentPage, toggleFollowingProgress, unfollow } from "../../redux/users-reducer";
import React, { ComponentType } from "react";
import { Users } from "./Users";
import { Preloader } from "../common/Preloader/Preloader";
import { compose } from "redux";
import {
  getCurrentPage,
  getPageSize,
  getTotalUsersCount,
  getUserFollowingInProgress,
  getUsers,
  getUsersIsFetching,
} from "../../redux/users-selectors";
import { UserType } from "../../types/types";

type MapStateToPropsType = {
  users: UserType[];
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: Array<number>;
};
type MapDispatchToPropsType = {
  setCurrentPage: (pageNumber: number) => void;
  toggleFollowingProgress: (isFetching: boolean, userId: number) => void;
  requestUsers: (currentPage: number, pageSize: number) => void;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
};
export type UsersContainerPropsType = MapStateToPropsType & MapDispatchToPropsType;

export class UsersContainer extends React.Component<UsersContainerPropsType, AppStateType> {
  componentDidMount() {
    const { currentPage, pageSize } = this.props;
    this.props.requestUsers(currentPage, pageSize);
  }

  onPageChanged = (pageNumber: number) => {
    const { pageSize } = this.props;
    this.props.setCurrentPage(pageNumber);
    this.props.requestUsers(pageNumber, pageSize);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          toggleFollowingProgress={this.props.toggleFollowingProgress}
          followingInProgress={this.props.followingInProgress}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
        />
      </>
    );
  }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getUsersIsFetching(state),
    followingInProgress: getUserFollowingInProgress(state),
  };
};

export default compose<ComponentType>(
  connect(mapStateToProps, { follow, unfollow, setCurrentPage, toggleFollowingProgress, requestUsers })
)(UsersContainer);
