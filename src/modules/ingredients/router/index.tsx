import { FC, ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { IngredientsList } from "../page/IngredientsList";
import { IngredientsForm } from "../page/IngredientsForm";

export const IngredientsRouter: FC = (): ReactElement => {
  return (
    <Routes>
      <Route index element={<IngredientsList />} />
      <Route path="ingredients" element={<IngredientsList />} />
      <Route path="/new" element={<IngredientsForm />} />
      <Route path="/edit/:ingredientId" element={<IngredientsForm />} />
      <Route path="*" element={<Navigate replace to="ingredients" />} />
    </Routes>
  );
};

export default IngredientsRouter;
