import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { FilterType, follow, requestUsers, unfollow } from "../../redux/users-reducer";
import React, { ComponentType } from "react";
import { Users } from "./Users";
import { Preloader } from "../common/Preloader/Preloader";
import { compose } from "redux";
import {
  getCurrentPage,
  getPageSize,
  getTotalUsersCount,
  getFollowingInProgress,
  getUsers,
  getUsersIsFetching,
  getUsersFilter,
} from "../../redux/users-selectors";
import { UserType } from "../../types/types";

export class UsersContainer extends React.Component<PropsType, AppStateType> {
  componentDidMount() {
    const { currentPage, pageSize, filter } = this.props;
    this.props.requestUsers(currentPage, pageSize, filter);
  }

  onPageChanged = (pageNumber: number) => {
    const { pageSize, filter } = this.props;
    this.props.requestUsers(pageNumber, pageSize, filter);
  };

  onFilterChanged = (filter: FilterType) => {
    const { pageSize } = this.props;
    this.props.requestUsers(1, pageSize, filter);
  };

  render() {
    return (
      <>
        <h2>{this.props.pageTitle}</h2>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          onFilterChanged={this.onFilterChanged}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          followingInProgress={this.props.followingInProgress}
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
    followingInProgress: getFollowingInProgress(state),
    filter: getUsersFilter(state),
  };
};

export default compose<ComponentType>(
  connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    follow,
    unfollow,
    requestUsers,
  })
)(UsersContainer);

// Types
type MapStateToPropsType = {
  users: UserType[];
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: Array<number>;
  filter: FilterType;
};
type MapDispatchToPropsType = {
  requestUsers: (currentPage: number, pageSize: number, filter: FilterType) => void;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
};
type OwnPropsType = {
  pageTitle: string;
};
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;
