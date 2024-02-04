import { faEye, faEyeLowVision } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAppDispatch,
  InputText,
  Icon,
  showMessage,
} from "../../../../shared";
import { loginUser } from "../../redux";
import { IAuthRequest } from "../../types";
import { LoginSchema } from "../../utils";
import { Button } from "@nextui-org/react";

interface ILoginProps {
  containerclassname?: string;
}

export interface ILogin {
  user: string;
  password: string;
}

export const Login: FC<ILoginProps> = () => {
  const formikLogin = useFormik<ILogin>({
    initialValues: {
      user: "",
      password: "",
    },
    onSubmit: async () => {
      await handleSubmit;
    },
    validationSchema: LoginSchema,
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [viewPassword, setViewPassword] = useState(true);

  const handleSubmit = async () => {
    const user: IAuthRequest = {
      usuario: formikLogin.values.user,
      contrasena: formikLogin.values.password,
    };
    const response = await dispatch(loginUser(user)).unwrap();
    if (response) {
      navigate("/menu", { replace: true });
    } else {
      dispatch(
        showMessage({
          severity: "error",
          summary: "Credenciales invalidas",
        })
      );
    }
  };

  return (
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
              onClick={() => {
                navigate("/auth/register");
              }}
              tabIndex={0}
              role="link"
              aria-label="Sign up here"
              className="cursor-pointer   leading-none
                              underline"
            >
              {" "}
              Registrarse
            </span>
          </p>

          <div className="mt-4">
            <InputText
              label="User"
              helpertext={
                formikLogin.touched.user ? formikLogin.errors.user : ""
              }
              value={formikLogin.values.user}
              aria-label="enter user"
              required
              type="user"
              name="user"
              onBlur={formikLogin.handleBlur}
              onChange={formikLogin.handleChange}
              className=" mt-2 w-full py-3 pl-3"
            />
          </div>
          <div className="mt-6  w-full">
            <div className="mb-1 flex flex-row">
              <label className="text-sm  leading-none ">Password</label>
              <p className="ml-1 -mt-1 text-red-600">*</p>
            </div>
            <div className="relative flex h-11 items-center justify-center">
              <input
                value={formikLogin.values.password}
                aria-label="enter Password"
                name="password"
                onBlur={formikLogin.handleBlur}
                onChange={formikLogin.handleChange}
                required
                type={`${viewPassword ? "password" : "text"}`}
                className="mt-4 h-full w-full py-3 pl-3 focus:border focus:border-blue-700 focus:outline-none
                text-sm font-normal dark:border-gray-200 dark:bg-gray-100 dark:text-gray-800 dark:focus:border-blue-700"
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
            {formikLogin.errors.password && formikLogin.touched.password ? (
              <div className="mt-4 flex items-center justify-between text-red-400">
                <p className="text-xs leading-3 tracking-normal">
                  {formikLogin.errors.password}
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
          <div className="mt-8">
            <Button
              // loading={loading}
              disabled={!formikLogin.isValid || !formikLogin.dirty}
              aria-label="login"
              type="submit"
              className="w-full bg-blue-500 cursor-pointer py-4 uppercase
               "
              onClick={handleSubmit}
            >
              Entrar
            </Button>
            <Button radius="full">Full</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
