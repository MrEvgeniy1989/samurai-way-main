import React, { FC } from "react";
import { Paginator } from "../common/Paginator/Paginator";
import { User } from "./User";
import { UserType } from "../../types/types";

export type UsersPropsType = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
  users: UserType[];
  toggleFollowingProgress: (isFetching: boolean, userId: number) => void;
  followingInProgress: number[];
  follow: any;
  unfollow: any;
};

export const Users: FC<UsersPropsType> = ({
  currentPage,
  totalUsersCount,
  pageSize,
  onPageChanged,
  users,
  followingInProgress,
  follow,
  unfollow,
}) => {
  return (
    <div>
      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
      />
      <div>
        {users.map((u: any) => (
          <User key={u.id} user={u} followingInProgress={followingInProgress} follow={follow} unfollow={unfollow} />
        ))}
      </div>
    </div>
  );
};
