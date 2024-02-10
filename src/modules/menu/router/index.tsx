import { FC, ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MenuList } from "../page/MenuList";
import { MenuForm } from "../page/MenuForm";

export const MenuRouter: FC = (): ReactElement => {
  return (
    <Routes>
      {/* <Route index element={<MenuPrincipal />} /> */}
      <Route path="" element={<MenuList  />} />
      <Route path="/list" element={<MenuList />} />
      <Route index path="/new" element={<MenuForm />} />
      <Route index path="/edit/:menuId" element={<MenuForm />} />
      <Route path="/" element={<Navigate replace to="menu" />} />
    </Routes>
  );
};

export default MenuRouter;
