import * as Yup from "yup";

export const MenuSchema = Yup.object().shape({
  name: Yup.string().required("Nombre requerido"),
  dateStart: Yup.string().required("Día de inicio requerido"),
});
