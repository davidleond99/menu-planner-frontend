import { FC, ReactElement, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "../../../shared";
import { AuthRouter, authSelector } from "../../auth";
import { IngredientsRouter } from "../../ingredients";
import MenuRouter from "../../menu/router";
import { useSelector } from "react-redux";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter: FC = (): ReactElement => {
  const { user } = useSelector(authSelector);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path={'/server-error'} element={<PageServerError />} /> */}
        <Route
          path="/auth/*"
          element={
            <Suspense>
              <PublicRoute>
                <AuthRouter />
              </PublicRoute>
            </Suspense>
          }
        />
        <Route path="/" element={<MainLayout />}>
          <Route
            path="menu"
            element={
              <PrivateRoute isAllowed={!!user}>
                <Suspense>
                  <MenuRouter />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="ingredients"
            element={
              <PrivateRoute isAllowed={!!user}>
                <Suspense>
                  <IngredientsRouter />
                </Suspense>
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/" element={<Navigate replace to={"/auth/login"} />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
