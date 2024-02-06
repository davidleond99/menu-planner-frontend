import { FC, ReactElement, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MenuRouter from "../../menu/router";
import { useSelector } from "react-redux";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { authSelector } from "../../auth/redux";
import { AuthRouter } from "../../auth/router";
import IngredientsRouter from "../../ingredients/router";
import { MainLayout } from "../../../shared/layouts";
import RecipeRouter from "../../recipe/router";

export const AppRouter: FC = (): ReactElement => {
  const { user } = useSelector(authSelector);

  return (
    <BrowserRouter>
      <Routes>
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
            path="menu/*"
            element={
              <PrivateRoute isAllowed={!!user}>
                <Suspense>
                  <MenuRouter />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="recipe/*"
            element={
              <PrivateRoute isAllowed={!!user}>
                <Suspense>
                  <RecipeRouter />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="ingredients/*"
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
