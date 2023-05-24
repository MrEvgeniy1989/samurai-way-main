import { updateObjectInArray } from "../utils/object-helpers";
import { UserType } from "../types/types";
import { usersAPI } from "../api/users-api";
import { BaseThunkType, InferActionsTypes } from "./redux-store";
import { Dispatch } from "redux";
import { APIResponseType, ResultCodesEnum } from "../api/api";

const initialState = {
  users: [] as UserType[],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as number[], // array of users ids
  // filter: {
  //   term: "",
  //   friend: null as null | boolean,
  // },
};

export const usersReducer = (state = initialState, action: ActionsType): UsersReducerInitialStateType => {
  switch (action.type) {
    case "SN/USERS/FOLLOW":
      return { ...state, users: updateObjectInArray(state.users, action.userId, "id", { followed: true }) };
    case "SN/USERS/UNFOLLOW":
      return { ...state, users: updateObjectInArray(state.users, action.userId, "id", { followed: false }) };
    case "SN/USERS/SET_USERS": {
      return { ...state, users: action.users };
    }
    case "SN/USERS/SET_CURRENT_PAGE": {
      return { ...state, currentPage: action.currentPage };
    }
    case "SN/USERS/SET_TOTAL_USERS_COUNT": {
      return { ...state, totalUsersCount: action.count };
    }
    case "SN/USERS/TOGGLE_IS_FETCHING": {
      return { ...state, isFetching: action.isFetching };
    }
    // case "SN/USERS/SET_FILTER": {
    //   return { ...state, filter: action.payload };
    // }
    case "SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS": {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id != action.userId),
      };
    }
    default:
      return state;
  }
};

// Actions
const usersReducerActions = {
  followSuccess: (userId: number) => ({ type: "SN/USERS/FOLLOW", userId } as const),
  unfollowSuccess: (userId: number) => ({ type: "SN/USERS/UNFOLLOW", userId } as const),
  setUsers: (users: Array<UserType>) => ({ type: "SN/USERS/SET_USERS", users } as const),
  setCurrentPage: (currentPage: number) => ({ type: "SN/USERS/SET_CURRENT_PAGE", currentPage } as const),
  // setFilter: (filter: FilterType) => ({ type: "SN/USERS/SET_FILTER", payload: filter } as const),
  setTotalUsersCount: (totalUsersCount: number) =>
    ({ type: "SN/USERS/SET_TOTAL_USERS_COUNT", count: totalUsersCount } as const),
  toggleIsFetching: (isFetching: boolean) => ({ type: "SN/USERS/TOGGLE_IS_FETCHING", isFetching } as const),
  toggleFollowingProgress: (isFetching: boolean, userId: number) =>
    ({ type: "SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS", isFetching, userId } as const),
};

// Thunks
export const requestUsers = (page: number, pageSize: number): ThunkType => {
  return async (dispatch) => {
    dispatch(usersReducerActions.toggleIsFetching(true));
    dispatch(usersReducerActions.setCurrentPage(page));
    // dispatch(usersReducerActions.setFilter(filter))
    // let data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend)

    let data = await usersAPI.getUsers(page, pageSize);

    dispatch(usersReducerActions.toggleIsFetching(false));
    dispatch(usersReducerActions.setUsers(data.items));
    dispatch(usersReducerActions.setTotalUsersCount(data.totalCount));
  };
};

export const _followUnfollowFlow = async (
  dispatch: Dispatch<ActionsType>,
  userId: number,
  apiMethod: (userId: number) => Promise<APIResponseType>,
  actionCreator: (userId: number) => ActionsType
) => {
  dispatch(usersReducerActions.toggleFollowingProgress(true, userId));

  const data = await apiMethod(userId);
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(actionCreator(userId));
  }
  dispatch(usersReducerActions.toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), usersReducerActions.followSuccess);
  };
};

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), usersReducerActions.unfollowSuccess);
  };
};

type UsersReducerInitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof usersReducerActions>;
type ThunkType = BaseThunkType<ActionsType>;
// export type FilterType = typeof initialState.filter;
