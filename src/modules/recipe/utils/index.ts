import * as Yup from "yup";

export const RecipeSchema = Yup.object().shape({
  name: Yup.string().required("Nombre requerido").max(50, "Solo 50 caracteres"),
  instructions: Yup.string()
    .required("Instrucciones requeridas")
    .max(100, "Solo 100 caracteres"),
});
