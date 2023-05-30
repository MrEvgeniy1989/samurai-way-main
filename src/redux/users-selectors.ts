import { AppStateType } from './redux-store';
import { UserType } from '../types/types';

export const getUsers = (state: AppStateType): UserType[] => {
  return state.usersPage.users;
};

//пример использования и типизации мемоизированного селектора (для сложных вычисляемых селекторов)
// export const getUsersFilter  = createSelector<[Selector<AppStateType, UserType[]>], UserType[]>(getUsers, (users) => {
//    return users.filter(elem => true)
// });

export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
};
export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage;
};
export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount;
};
export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching;
};
export const getFollowingInProgress = (state: AppStateType) => {
  return state.usersPage.followingInProgress;
};
export const getUsersFilter = (state: AppStateType) => {
  return state.usersPage.filter;
};
