import { ResultCodesEnum, usersAPI } from "../api/api";
import { ThunkDispatch } from "redux-thunk";
import { updateObjectInArray } from "../utils/object-helpers";
import { UserType } from "../types/types";
import { InferActionsTypes } from "./redux-store";

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof userReducerActions>;

const initialState = {
  users: [] as UserType[],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as number[], // array of users ids
};

export const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case "FOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", { followed: true }),
      };
    // return {...state, users: state.users.map(el => el.id === action.userId ? {...el, followed: true} : el)}
    case "UNFOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", { followed: false }),
      };
    // return {...state, users: state.users.map(el => el.id === action.userId ? {...el, followed: false} : el)}
    case "SET_USERS":
      return { ...state, users: action.users };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.currentPage };
    case "SET_TOTAL_USERS_COUNT":
      return { ...state, totalUsersCount: action.count };
    case "TOGGLE_IS_FETCHING":
      return { ...state, isFetching: action.isFetching };
    case "TOGGLE_IS_FOLLOWING_PROGRESS":
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    default:
      return state;
  }
};

// Actions
export const userReducerActions = {
  followSuccess: (userId: number) => ({ type: "FOLLOW", userId } as const),
  unfollowSuccess: (userId: number) => ({ type: "UNFOLLOW", userId } as const),
  setUsers: (users: UserType[]) => ({ type: "SET_USERS", users } as const),
  setCurrentPage: (currentPage: number) => ({ type: "SET_CURRENT_PAGE", currentPage } as const),
  setTotalUsersCount: (count: number) => ({ type: "SET_TOTAL_USERS_COUNT", count } as const),
  toggleIsFetching: (isFetching: boolean) => ({ type: "TOGGLE_IS_FETCHING", isFetching } as const),
  toggleFollowingProgress: (isFetching: boolean, userId: number) =>
    ({
      type: "TOGGLE_IS_FOLLOWING_PROGRESS",
      isFetching,
      userId,
    } as const),
};

// Thunks
export const requestUsers = (page: number, pageSize: number) => {
  return async (dispatch: ThunkDispatch<InitialStateType, any, ActionsTypes>) => {
    dispatch(userReducerActions.toggleIsFetching(true));
    dispatch(userReducerActions.setCurrentPage(page));

    let data = await usersAPI.getUsers(page, pageSize);

    dispatch(userReducerActions.toggleIsFetching(false));
    dispatch(userReducerActions.setUsers(data.items));
    dispatch(userReducerActions.setTotalUsersCount(data.totalCount));
  };
};
export const _followUnfollowFlow = async (
  dispatch: ThunkDispatch<InitialStateType, unknown, ActionsTypes>,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => ActionsTypes
) => {
  dispatch(userReducerActions.toggleFollowingProgress(true, userId));

  const response = await apiMethod(userId);

  if (response.data.resultCode === ResultCodesEnum.Success) {
    dispatch(actionCreator(userId));
  }
  dispatch(userReducerActions.toggleFollowingProgress(false, userId));
};
export const follow = (userId: number) => {
  return async (dispatch: ThunkDispatch<InitialStateType, any, ActionsTypes>) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), userReducerActions.followSuccess);
  };
};
export const unfollow = (userId: number) => {
  return async (dispatch: ThunkDispatch<InitialStateType, any, ActionsTypes>) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), userReducerActions.unfollowSuccess);
  };
};
