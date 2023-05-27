import React, { FC, useEffect } from "react";
import { Paginator } from "../common/Paginator/Paginator";
import { User } from "./User";
import { UserType } from "../../types/types";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FilterType, follow, requestUsers, unfollow } from "../../redux/users-reducer";
import {
  getCurrentPage,
  getFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter,
} from "../../redux/users-selectors";
import { UsersSearchForm } from "./UsersSearchForm";
import * as queryString from "querystring";

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
    const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType;

    let actualPage = currentPage;
    let actualFilter = filter;

    if (!!parsed.page) actualPage = Number(parsed.page);
    if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string };

    switch (parsed.friend) {
      case "null":
        actualFilter = { ...actualFilter, friend: null };
        break;
      case "true":
        actualFilter = { ...actualFilter, friend: true };
        break;
      case "false":
        actualFilter = { ...actualFilter, friend: false };
        break;
    }

    dispatch(requestUsers(actualPage, pageSize, actualFilter));
  }, []);

  useEffect(() => {
    const query: QueryParamsType = {};

    if (!!filter.term) query.term = filter.term;
    if (filter.friend !== null) query.friend = String(filter.friend);
    if (currentPage !== 1) query.page = String(currentPage);

    history.push({
      pathname: "/developers",
      search: queryString.stringify(query),
    });
  }, [filter, currentPage]);

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter));
  };
  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter));
  };
  const followUser = (userId: number) => {
    dispatch(follow(userId));
  };
  const unfollowUser = (userId: number) => {
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
          <User
            key={u.id}
            user={u}
            followingInProgress={followingInProgress}
            follow={followUser}
            unfollow={unfollowUser}
          />
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
type PropsType = {};
type QueryParamsType = { term?: string; page?: string; friend?: string };
