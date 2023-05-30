import { usersReducerActions, follow, unfollow } from './users-reducer';
import { usersAPI } from '../api/users-api';
import { APIResponseType, ResultCodesEnum } from '../api/api';

jest.mock('../api/users-api');
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
  userAPIMock.follow.mockClear();
  userAPIMock.unfollow.mockClear();
});

const result: APIResponseType = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  data: {},
};

test('success follow thunk', async () => {
  const thunk = follow(1);
  userAPIMock.follow.mockReturnValue(Promise.resolve(result));
  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, usersReducerActions.toggleFollowingProgress(true, 1));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, usersReducerActions.followSuccess(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, usersReducerActions.toggleFollowingProgress(false, 1));
});

test('success unfollow thunk', async () => {
  const thunk = unfollow(1);
  userAPIMock.unfollow.mockReturnValue(Promise.resolve(result));
  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, usersReducerActions.toggleFollowingProgress(true, 1));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, usersReducerActions.unfollowSuccess(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, usersReducerActions.toggleFollowingProgress(false, 1));
});
