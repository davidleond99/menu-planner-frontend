import * as Yup from "yup";

export const IngredientSchema = Yup.object().shape({
  name: Yup.string().required("Nombre requerido"),
  category: Yup.string().required("Categoía requerida"),
  unity: Yup.string().required("Unidad de medida requerida"),
});
