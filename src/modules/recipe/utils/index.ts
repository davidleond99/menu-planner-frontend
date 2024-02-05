import * as Yup from "yup";

export const RecipeSchema = Yup.object().shape({
  name: Yup.string().required("Nombre requerido"),
  instructions: Yup.string().required("Unidad de medida requerida"),
});
