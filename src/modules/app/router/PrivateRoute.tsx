import { FC, ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface IPrivateRouteProps {
  children?: ReactElement;
  redirectTo?: string;
  isAllowed?: boolean;
}

export const PrivateRoute: FC<IPrivateRouteProps> = ({
  children,
  redirectTo = '/auth/login',
  isAllowed,
}): ReactElement => {
  if (!isAllowed) {
    return <Navigate replace to={redirectTo} />;
  }
  return children || <Outlet />;
};
