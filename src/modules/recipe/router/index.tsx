import { FC, ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RecipeList } from "../page/RecipeList";

export const RecipeRouter: FC = (): ReactElement => {
  return (
    <Routes>
      <Route index element={<RecipeList />} />
      <Route path="*" element={<Navigate replace to="recipe" />} />
    </Routes>
  );
};

export default RecipeRouter;
