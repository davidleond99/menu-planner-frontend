import { FC, ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { IngredientsList } from "../page/IngredientsList";

export const IngredientsRouter: FC = (): ReactElement => {
  return (
    <Routes>
      <Route index element={<IngredientsList />} />
      <Route path="ingredients" element={<IngredientsList />} />
      <Route path="*" element={<Navigate replace to="ingredients" />} />
    </Routes>
  );
};

export default IngredientsRouter;
