import * as Yup from "yup";

export const MenuSchema = Yup.object().shape({
  name: Yup.string().required("Nombre requerido").max(50,'Solo 50 caracteres'),
  dateStart: Yup.string().required("Día de inicio requerido"),
});
