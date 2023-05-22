import React, { FC } from "react";
import { Paginator } from "../common/Paginator/Paginator";
import { User } from "./User";
import { UserType } from "../../types/types";

type PropsType = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
  users: UserType[];
  toggleFollowingProgress: (isFetching: boolean, userId: number) => void;
  followingInProgress: number[];
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
};

export const Users: FC<PropsType> = ({
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
        {users.map((u: UserType) => (
          <User key={u.id} user={u} followingInProgress={followingInProgress} follow={follow} unfollow={unfollow} />
        ))}
      </div>
    </div>
  );
};
