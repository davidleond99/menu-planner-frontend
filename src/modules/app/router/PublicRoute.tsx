import { Navigate } from 'react-router';
import { FC, ReactElement } from 'react';

interface IPublicRoute {
  children: ReactElement;
}

export const PublicRoute: FC<IPublicRoute> = ({ children }): ReactElement => {
  return localStorage.getItem('token') ? (
    <Navigate replace to="/menu" />
  ) : (
    children
  );
};
