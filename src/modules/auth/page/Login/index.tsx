import { faEye, faEyeLowVision } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authSelector, loginUser } from "../../redux";
import { IAuthRequest } from "../../types";
import { LoginSchema } from "../../utils";
import { Button, Input } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { Icon } from "../../../../shared/components";
import { useAppDispatch } from "../../../../shared/store";
import { showMsg } from "../../../../shared/redux/message";

export const Login: FC = () => {
  const formikLogin = useFormik<IAuthRequest>({
    initialValues: {
      user_name: "",
      password: "",
    },
    onSubmit: () => {
      handleSubmit;
    },
    validationSchema: LoginSchema,
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const user: IAuthRequest = {
      user_name: formikLogin.values.user_name,
      password: formikLogin.values.password,
    };

    try {
      const response = await dispatch(loginUser(user)).unwrap();
      if (response) {
        navigate("/menu/principal", { replace: true });
      } else {
        dispatch(
          showMsg({
            type: "success",
            msg: "Inicie sesión",
          })
        );
      }
    } catch (error) {
      dispatch(
        showMsg({
          type: "success",
          msg: "Inicie sesión",
        })
      );
    }
  };

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const { loading } = useSelector(authSelector);

  return (
    <form>
      <div className="min-h-screen w-full bg-gradient-to-tl from-green-400 to-indigo-900 px-4 pt-5">
        <div className="flex flex-col items-center justify-center mt-16">
          <h2 className="text-4xl leading-tight text-white">Menu Planner</h2>

          <div className="mt-8  bg-white p-10  shadow md:w-1/2 lg:w-3/12">
            <p
              aria-label="Autenticarse"
              className="text-2xl font-extrabold leading-6 "
            >
              Autenticarse
            </p>
            <p className="mt-4   leading-none text-gray-500">
              ¿No tiene una cuenta?{" "}
              <span
                onClick={() => navigate("/auth/register")}
                tabIndex={0}
                role="link"
                aria-label="Sign up here"
                className="cursor-pointer leading-none underline"
              >
                {" "}
                Registrarse
              </span>
            </p>

            <div className="mt-4 w-full">
              <Input
                label="Nombre de usuario"
                errorMessage={
                  formikLogin.touched.user_name
                    ? formikLogin.errors.user_name
                    : ""
                }
                isInvalid={
                  !!formikLogin.errors.user_name &&
                  !!formikLogin.touched.user_name
                }
                value={formikLogin.values.user_name}
                aria-label="enter user"
                required
                type="user"
                name="user_name"
                onBlur={formikLogin.handleBlur}
                onChange={formikLogin.handleChange}
                className="max-w-xs"
              />
            </div>
            <div className="mt-6 w-full">
              <div className="relative flex h-11 items-center justify-center">
                <Input
                  errorMessage={
                    formikLogin.touched.password
                      ? formikLogin.errors.password
                      : ""
                  }
                  isInvalid={
                    !!formikLogin.errors.password &&
                    !!formikLogin.touched.password
                  }
                  label="Contraseña"
                  value={formikLogin.values.password}
                  name="password"
                  onBlur={formikLogin.handleBlur}
                  onChange={formikLogin.handleChange}
                  required
                  placeholder="Introduzca su contraseña"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
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
                  type={isVisible ? "text" : "password"}
                  className="max-w-xs mt-4"
                />
              </div>
            </div>
            <div className="mt-8">
              <Button
                isLoading={loading}
                disabled={!formikLogin.isValid || !formikLogin.dirty}
                aria-label="login"
                type="submit"
                className="w-full bg-gradient-to-tl from-green-300 to-indigo-400 cursor-pointer py-4 uppercase mt-4 font-semibold "
                onClick={handleSubmit}
              >
                Entrar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
