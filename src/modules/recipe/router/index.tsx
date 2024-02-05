import { FC, ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RecipeList } from "../page/RecipeList";
import { RecipeForm } from "../page/RecipeForm";

export const RecipeRouter: FC = (): ReactElement => {
  return (
    <Routes>
      <Route index element={<RecipeList />} />
      <Route index path="recipe" element={<RecipeList />} />
      <Route index path="/form" element={<RecipeForm />} />
      <Route path="*" element={<Navigate replace to="recipe" />} />
    </Routes>
  );
};

export default RecipeRouter;
