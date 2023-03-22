import {AppStateType} from './redux-store';
import {UserType} from './users-reducer';

export const getUsers = (state: AppStateType): UserType[] => {
  return state.usersPage.users
}

//пример использования и типизации мемоизированного селектора (для сложных вычисляемых селекторов)
// export const getUsersFilter  = createSelector<[Selector<stateType, UsersType[]>], UsersType[]>(getUsers, (users) => {
//    return users.filter(elem => true)
// });

export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize
}
export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage
}
export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount
}
export const getUsersIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching
}
export const getUserFollowingInProgress = (state: AppStateType) => {
  return state.usersPage.followingInProgress
}