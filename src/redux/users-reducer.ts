import { usersAPI } from "../api/api";
import { ThunkDispatch } from "redux-thunk";
import { updateObjectInArray } from "../utils/object-helpers";
import { UserType } from "../types/types";

// type LocationType = {
//     city: string
//     country: string
// }

// export type InitialStateType = {
//     users: UserType[]
//     pageSize: number
//     totalUsersCount: number
//     currentPage: number
//     isFetching: boolean
//     followingInProgress: Array<number>
// }

export type InitialStateType = typeof initialState;
type ActionsType =
  | ReturnType<typeof followSuccess>
  | ReturnType<typeof unfollowSuccess>
  | ReturnType<typeof setUsers>
  | ReturnType<typeof setCurrentPage>
  | ReturnType<typeof setTotalUsersCount>
  | ReturnType<typeof toggleIsFetching>
  | ReturnType<typeof toggleFollowingProgress>;

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

const initialState = {
  users: [] as UserType[],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as number[], // array of users ids
};

export const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", { followed: true }),
      };
    // return {...state, users: state.users.map(el => el.id === action.userId ? {...el, followed: true} : el)}
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", { followed: false }),
      };
    // return {...state, users: state.users.map(el => el.id === action.userId ? {...el, followed: false} : el)}
    case SET_USERS:
      return { ...state, users: action.users };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUsersCount: action.count };
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    case TOGGLE_IS_FOLLOWING_PROGRESS:
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
export const followSuccess = (userId: number) => ({ type: FOLLOW, userId } as const);
export const unfollowSuccess = (userId: number) => ({ type: UNFOLLOW, userId } as const);
export const setUsers = (users: UserType[]) => ({ type: SET_USERS, users } as const);
export const setCurrentPage = (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage } as const);
export const setTotalUsersCount = (count: number) => ({ type: SET_TOTAL_USERS_COUNT, count } as const);
export const toggleIsFetching = (isFetching: boolean) => ({ type: TOGGLE_IS_FETCHING, isFetching } as const);
export const toggleFollowingProgress = (isFetching: boolean, userId: number) =>
  ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId,
  } as const);

// Thunks
export const requestUsers = (page: number, pageSize: number) => {
  return async (dispatch: ThunkDispatch<InitialStateType, any, ActionsType>) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));

    let data = await usersAPI.getUsers(page, pageSize);

    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  };
};
export const _followUnfollowFlow = async (
  dispatch: ThunkDispatch<InitialStateType, unknown, ActionsType>,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => ReturnType<typeof followSuccess> | ReturnType<typeof unfollowSuccess>
) => {
  dispatch(toggleFollowingProgress(true, userId));

  const response = await apiMethod(userId);

  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
};
export const follow = (userId: number) => {
  return async (dispatch: ThunkDispatch<InitialStateType, any, ActionsType>) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
  };
};
export const unfollow = (userId: number) => {
  return async (dispatch: ThunkDispatch<InitialStateType, any, ActionsType>) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
  };
};
