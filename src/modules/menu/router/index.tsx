import { FC, ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Menu } from '../page';

export const MenuRouter: FC = (): ReactElement => {
  return (
    <Routes>
      <Route index element={<Menu />} />
      <Route path="menu" element={<Menu />} />
      <Route path="*" element={<Navigate replace to="menu" />} />
    </Routes>
  );
};

export default MenuRouter;
