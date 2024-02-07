import { faEye, faEyeLowVision } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterSchema } from "../../utils";
import { Button, Input } from "@nextui-org/react";
import { Icon } from "../../../../shared/components";
import { useAppDispatch } from "../../../../shared/store";
import { createUser } from "../../redux";
import { showMsg } from "../../../../shared/redux/message";

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
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [viewPassword, setViewPassword] = useState(true);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(true);

  const handleSubmit = async () => {
    try {
      await dispatch(
        createUser({
          name: formikRegister.values.name,
          user_name: formikRegister.values.userName,
          password: formikRegister.values.password,
        })
      );
      dispatch(showMsg({ msg: "Creado", type: "success" }));
      navigate("auth/login");
    } catch (error) {
      dispatch(showMsg({ msg: "error", type: "failure" }));
    }
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
              className="cursor-pointer underline"
            >
              {" "}
              Autenticarse
            </span>
          </p>

          <div className="flex flex-col ml-7">
            <div className="flex w-full flex-col justify-start content-start">
              <div className="mt-2">
                <Input
                  label="Nombre"
                  errorMessage={
                    formikRegister.touched.name
                      ? formikRegister.errors.name
                      : ""
                  }
                  isInvalid={
                    !!formikRegister.errors.name &&
                    !!formikRegister.touched.name
                  }
                  value={formikRegister.values.name}
                  aria-label="Nombre"
                  required
                  type="user"
                  name="name"
                  onBlur={formikRegister.handleBlur}
                  onChange={formikRegister.handleChange}
                  className="max-w-xs mt-3"
                />
              </div>
              <div className="mt-2">
                <Input
                  label="Nombre de usuario"
                  errorMessage={
                    formikRegister.touched.userName
                      ? formikRegister.errors.userName
                      : ""
                  }
                  isInvalid={
                    !!formikRegister.errors.userName &&
                    !!formikRegister.touched.userName
                  }
                  value={formikRegister.values.userName}
                  aria-label="Nombre de usuario"
                  required
                  type="user"
                  name="userName"
                  onBlur={formikRegister.handleBlur}
                  onChange={formikRegister.handleChange}
                  className="max-w-xs mt-3"
                />
              </div>
              <div className="w-full flex flex-col">
                <div className=" h-11 items-center justify-center mb-4 mt-2">
                  <Input
                    errorMessage={
                      formikRegister.touched.password
                        ? formikRegister.errors.password
                        : ""
                    }
                    isInvalid={
                      !!formikRegister.errors.password &&
                      !!formikRegister.touched.password
                    }
                    label="Contraseña"
                    value={formikRegister.values.password}
                    name="password"
                    aria-label="Introduzca su contraseña"
                    onBlur={formikRegister.handleBlur}
                    onChange={formikRegister.handleChange}
                    required
                    placeholder="Introduzca su contraseña"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={() => setViewPassword(!viewPassword)}
                      >
                        {viewPassword ? (
                          <Icon
                            icon={faEyeLowVision}
                            className=" text-default-400 pointer-events-none"
                          />
                        ) : (
                          <Icon
                            icon={faEye}
                            className="text-default-400 pointer-events-none"
                          />
                        )}
                      </button>
                    }
                    type={viewPassword ? "text" : "password"}
                    className="max-w-xs mt-4"
                  />
                </div>
              </div>

              <div className="items-center justify-center mt-4">
                <Input
                  errorMessage={
                    formikRegister.touched.confirmPassword
                      ? formikRegister.errors.confirmPassword
                      : ""
                  }
                  isInvalid={
                    !!formikRegister.errors.confirmPassword &&
                    !!formikRegister.touched.confirmPassword
                  }
                  label="Confirmar contraseña"
                  value={formikRegister.values.confirmPassword}
                  name="confirmPassword"
                  onBlur={formikRegister.handleBlur}
                  onChange={formikRegister.handleChange}
                  required
                  placeholder="Confirme su contraseña"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => {
                        setViewConfirmPassword(!viewConfirmPassword);
                      }}
                    >
                      {viewConfirmPassword ? (
                        <Icon
                          icon={faEyeLowVision}
                          className=" text-default-400 pointer-events-none"
                        />
                      ) : (
                        <Icon
                          icon={faEye}
                          className="text-default-400 pointer-events-none"
                        />
                      )}
                    </button>
                  }
                  type={viewConfirmPassword ? "text" : "password"}
                  className="max-w-xs mt-4"
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Button
              disabled={!formikRegister.isValid || !formikRegister.dirty}
              aria-label="create"
              onClick={handleSubmit}
              color="primary"
              className="w-full bg-gradient-to-tl text-black from-green-300 to-indigo-400 cursor-pointer py-4 uppercase font-semibold
              "
            >
              Registrarse
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
