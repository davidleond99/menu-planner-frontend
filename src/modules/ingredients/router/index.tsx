import { FC, ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Ingredients } from "../page/IngredientsList";

export const IngredientsRouter: FC = (): ReactElement => {
  return (
    <Routes>
      <Route index element={<Ingredients />} />
      <Route path="ingredients" element={<Ingredients />} />
      <Route path="*" element={<Navigate replace to="ingredients" />} />
    </Routes>
  );
};

export default IngredientsRouter;
