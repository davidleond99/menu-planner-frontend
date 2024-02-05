import * as Yup from "yup";

export const IngredientSchema = Yup.object().shape({
  name: Yup.string().required("Nombre requerido"),
  unity: Yup.string().required("Unidad de medida requerida"),
});
