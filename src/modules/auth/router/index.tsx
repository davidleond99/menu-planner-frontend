import { FC, ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from '../page';
import { Register } from "../page/Register";

export const AuthRouter: FC = (): ReactElement => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
  );
};

export default AuthRouter;
