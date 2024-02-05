import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  user_name: Yup.string().required("Nombre de usuario requerido"),
  password: Yup.string()
    .required("Contraseña requerida")
    .min(8, "La contraseña debe contener al menos 8 caracteres"),
});

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Nombre requerido"),
  userName: Yup.string().required("Nombre de usuario requerido"),
  password: Yup.string()
    .required("Contraseña requerida")
    .min(8, "La contraseña debe contener al menos 8 caracteres"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "La contraseña no coincide")
    .required("Confirmar contraseña requerido"),
});
