import { faEye, faEyeLowVision } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterSchema } from "../../utils";
import { Button } from "@nextui-org/react";
import { InputText, Icon } from "../../../../shared/components";

interface IRegisterProps {
  containerclassname?: string;
}
export interface ISelectWhere {
  value: string;
  label: string;
}

export interface IRegister {
  userName: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export const Register: FC<IRegisterProps> = () => {
  const formikRegister = useFormik<IRegister>({
    initialValues: {
      userName: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: () => {},
    validationSchema: RegisterSchema,
  });

  const navigate = useNavigate();
  const [viewPassword, setViewPassword] = useState(true);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(true);

  const handleSubmit = async () => {
    return;
  };

  return (
    <div className="max-w-8xl min-h-screen bg-gradient-to-tl from-green-400 to-indigo-900 px-4 pt-2">
      <div className="max-w-8xl flex flex-col items-center mt-8 justify-center">
        <h2 className="text-4xl leading-tight text-white">Menu Planner</h2>

        <div className="w-full mt-4 bg-white px-10 py-6 shadow md:w-1/3 lg:w-1/3">
          <p
            aria-label="Login to your account"
            className="text-2xl font-extrabold leading-6 "
          >
            Crear cuenta
          </p>
          <p className="mt-4    text-gray-500">
            ¿Ya tiene una cuenta?{" "}
            <span
              onClick={() => {
                navigate("auth/login");
              }}
              tabIndex={0}
              role="link"
              aria-label="Sign up here"
              className="cursor-pointer   
                              underline"
            >
              {" "}
              Autenticarse
            </span>
          </p>

          <div className="flex flex-row ">
            <div className="flex w-full flex-col">
              <div className="mt-1 ">
                <InputText
                  label="Nombre"
                  helpertext={
                    formikRegister.touched.name
                      ? formikRegister.errors.name
                      : ""
                  }
                  value={formikRegister.values.name}
                  aria-label="Introduzca su nombre"
                  required
                  name="name"
                  onBlur={formikRegister.handleBlur}
                  onChange={formikRegister.handleChange}
                  className="mt-2 w-full  
                                    py-3 pl-3    "
                />
              </div>
              <div className="mt-4">
                <InputText
                  label="Nombre de usuario"
                  helpertext={
                    formikRegister.touched.userName
                      ? formikRegister.errors.userName
                      : ""
                  }
                  value={formikRegister.values.userName}
                  aria-label="Introduzca un nombre de usuario"
                  required
                  type="text"
                  onBlur={formikRegister.handleBlur}
                  onChange={formikRegister.handleChange}
                  name="userName"
                  className="mt-3 w-full py-3 pl-3"
                />
              </div>
              <div className="mt-6">
                <div className="mb-2 flex flex-row">
                  <label className=" text-md">Contraseña</label>
                  <p className="ml-2 text-red-600">*</p>
                </div>
                <div className="relative flex h-11 items-center justify-center">
                  <input
                    value={formikRegister.values.password}
                    aria-label="Introduzca la contraseña"
                    name="password"
                    onBlur={formikRegister.handleBlur}
                    onChange={formikRegister.handleChange}
                    required
                    type={`${viewPassword ? "password" : "text"}`}
                    className="mt-4 h-full w-full py-3 pl-3 focus:border focus:border-blue-700 focus:outline-none
                  text-md font-normal dark:border-gray-200 dark:bg-gray-100 dark:text-gray-400 dark:focus:border-blue-700"
                  />
                  <div className="absolute right-0 mt-4 mr-3 cursor-pointer">
                    <Icon
                      onClick={() => {
                        setViewPassword(!viewPassword);
                      }}
                      icon={viewPassword ? faEye : faEyeLowVision}
                    />
                  </div>
                </div>
                {formikRegister.errors.password &&
                formikRegister.touched.password ? (
                  <div className="mt-3 flex items-center justify-between text-red-400">
                    <p className="text-xs leading-3 tracking-normal">
                      {formikRegister.errors.password}
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-circle-x"
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <circle cx={12} cy={12} r={9} />
                      <path d="M10 10l4 4m0 -4l-4 4" />
                    </svg>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="mt-6 flex flex-row">
                <label className="mb-2 text-md   ">Confirmar contraseña</label>
                <p className="ml-2 text-red-600">*</p>
              </div>
              <div className="relative flex h-11 items-center justify-center">
                <input
                  value={formikRegister.values.confirmPassword}
                  name="confirmPassword"
                  onBlur={formikRegister.handleBlur}
                  onChange={formikRegister.handleChange}
                  required
                  type={`${viewConfirmPassword ? "password" : "text"}`}
                  className="mt-4 h-full w-full py-3 pl-3 focus:border focus:border-blue-700 focus:outline-none
                  text-md font-normal dark:border-gray-200 dark:bg-gray-100 dark:text-gray-400 dark:focus:border-blue-700"
                />
                <div className="absolute right-0 mt-4 mr-3 cursor-pointer">
                  <Icon
                    onClick={() => {
                      setViewConfirmPassword(!viewConfirmPassword);
                    }}
                    icon={viewConfirmPassword ? faEye : faEyeLowVision}
                  />
                </div>
              </div>
              {formikRegister.errors.confirmPassword &&
              formikRegister.touched.confirmPassword ? (
                <div className="mt-3 flex items-center justify-between text-red-400">
                  <p className="text-xs leading-3 tracking-normal">
                    {formikRegister.errors.confirmPassword}
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-circle-x"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <circle cx={12} cy={12} r={9} />
                    <path d="M10 10l4 4m0 -4l-4 4" />
                  </svg>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="mt-8">
            <Button
              disabled={!formikRegister.isValid || !formikRegister.dirty}
              aria-label="create"
              onClick={handleSubmit}
              color="primary"
              className="w-full  py-4 uppercase"
            >
              Registrarse
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
