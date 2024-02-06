import { FC, ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MenuList } from "../page/MenuList";
import { MenuForm } from "../page/MenuForm";
import { MenuPrincipal } from "../page/MenuPrincipal";

export const MenuRouter: FC = (): ReactElement => {
  return (
    <Routes>
      <Route index element={<MenuList />} />
      <Route path="menu" element={<MenuList />} />
      <Route path="/principal" element={<MenuPrincipal />} />
      <Route index path="/new" element={<MenuForm />} />
      <Route path="*" element={<Navigate replace to="menu" />} />
    </Routes>
  );
};

export default MenuRouter;
