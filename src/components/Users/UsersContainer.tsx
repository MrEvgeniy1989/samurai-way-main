import { useSelector } from 'react-redux';
import React from 'react';
import { Users } from './Users';
import { Preloader } from '../common/Preloader/Preloader';
import { getIsFetching } from '../../redux/users-selectors';

type UsersPagePropsType = {
  pageTitle: string;
};

export const UsersPage: React.FC<UsersPagePropsType> = ({ pageTitle }) => {
  const isFetching = useSelector(getIsFetching);

  return (
    <>
      <h2>{pageTitle}</h2>
      {isFetching ? <Preloader /> : null}
      <Users />
    </>
  );
};
