import { FC, ReactElement, Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AuthRouter from "../../auth/router";
import MenuRouter from "../../menu/router";

export const AppRouter: FC = (): ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path={'/server-error'} element={<PageServerError />} /> */}
        <Route
          path="/auth/*"
          element={
            <Suspense>
              <AuthRouter />
            </Suspense>
          }
        />
        <Route
          path="menu"
          element={
            <Suspense>
              <MenuRouter />
            </Suspense>
          }
        ></Route>
        <Route path="/" element={<Navigate replace to={"/auth/login"} />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
