import React, { FC, useEffect } from "react";
import { Paginator } from "../common/Paginator/Paginator";
import { User } from "./User";
import { UserType } from "../../types/types";
import { useHistory } from "react-router-dom";
// import * as queryString from "querystring";
import { useDispatch, useSelector } from "react-redux";
import { FilterType, requestUsers } from "../../redux/users-reducer";
import {
  getCurrentPage,
  getFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter,
} from "../../redux/users-selectors";
import { UsersSearchForm } from "./UsersSearchForm";

export const Users: FC<PropsType> = () => {
  const users = useSelector(getUsers);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);
  const followingInProgress = useSelector(getFollowingInProgress);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType;

    let actualPage = currentPage;
    let actualFilter = filter;

    // if (!!parsed.page) actualPage = Number(parsed.page);
    //
    // if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string };
    //
    // switch (parsed.friend) {
    //   case "null":
    //     actualFilter = { ...actualFilter, friend: null };
    //     break;
    //   case "true":
    //     actualFilter = { ...actualFilter, friend: true };
    //     break;
    //   case "false":
    //     actualFilter = { ...actualFilter, friend: false };
    //     break;
    // }

    dispatch(requestUsers(actualPage, pageSize, actualFilter));
  }, []);

  useEffect(() => {
    const query: QueryParamsType = {};

    if (!!filter.term) query.term = filter.term;
    if (filter.friend !== null) query.friend = String(filter.friend);
    if (currentPage !== 1) query.page = String(currentPage);

    history.push({
      pathname: "/users",
      // pathname: "/developers",
      // search: queryString.stringify(query),
    });
  }, [filter, currentPage]);

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter));
  };
  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter));
  };
  const follow = (userId: number) => {
    dispatch(follow(userId));
  };
  const unfollow = (userId: number) => {
    dispatch(unfollow(userId));
  };

  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
      />
      <div>
        {users.map((u: UserType) => (
          <User key={u.id} user={u} followingInProgress={followingInProgress} follow={follow} unfollow={unfollow} />
        ))}
      </div>
      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
      />
    </div>
  );
};

// Types
type PropsType = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
  onFilterChanged: (filter: FilterType) => void;
  users: UserType[];
  followingInProgress: number[];
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
};
type QueryParamsType = { term?: string; page?: string; friend?: string };
