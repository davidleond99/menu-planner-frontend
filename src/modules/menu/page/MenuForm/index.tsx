import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MenuSchema } from "../../utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ICreateMenu } from "../../types";
import { getRecipes } from "../../../recipe/application";
import { IGetRecipes } from "../../../recipe/types";
import { useAppDispatch } from "../../../../shared/store";
import { createMenus, getMenuById, updateMenu } from "../../application";
import { useSelector } from "react-redux";
import { authSelector } from "../../../auth/redux";
import { showMsg } from "../../../../shared/redux/message";

export const MenuForm = () => {
  const formikMenu = useFormik<ICreateMenu>({
    initialValues: {
      id: 0,
      userId: 1,
      name: "",
      dateStart: "",
      recipesId: [],
    },
    onSubmit: async () => {},
    validationSchema: MenuSchema,
  });

  const { menuId } = useParams();

  const { user } = useSelector(authSelector);
  const [recipes, setRecipes] = useState<IGetRecipes[]>([]);
  const [recipesid, setRecipesid] = useState<number[]>([]);

  const [selectedDate, setSelectedDate] = useState<Date>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCreate = () => {
    try {
      dispatch(
        createMenus({
          name: formikMenu.values.name,
          userId: user!.user.id,
          dateStart: selectedDate!.toString(),
          recipesId: recipesid,
        })
      );
      dispatch(
        showMsg({
          type: "success",
          msg: "Menu creado",
        })
      );
    } catch (error) {
      dispatch(
        showMsg({
          type: "failure",
          msg: "Error",
        })
      );
    }
  };

  function handleUpdate() {
    try {
      dispatch(
        updateMenu({
          id: parseInt(menuId!),
          data: {
            userId: user!.user.id,
            name: formikMenu.values.name,
            dateStart: formikMenu.values.dateStart,
            recipesId: formikMenu.values.recipesId,
          },
        })
      );
      dispatch(
        showMsg({
          type: "success",
          msg: "Menu actualizado",
        })
      );
    } catch (error) {
      dispatch(
        showMsg({
          type: "failure",
          msg: "Error",
        })
      );
    }
  }

  const loadInitialData = async () => {
    try {
      if (menuId) {
        const menu = await dispatch(getMenuById(parseInt(menuId))).unwrap();
        if (menu) {
          formikMenu.resetForm({
            values: {
              id: menu.id,
              name: menu.name,
              userId: user!.user.id,
              dateStart: menu.dateStart,
              recipesId: menu.recipes?.map((recipe) => recipe.id) ?? [],
            },
          });
          setSelectedDate(new Date(menu.dateStart));
        }
      }
    } catch (error) {
      dispatch(
        showMsg({
          type: "failure",
          msg: "Error",
        })
      );
    }
  };

  useEffect(() => {
    void loadInitialData();
  }, [menuId]);

  useEffect(() => {
    void dispatch(getRecipes())
      .unwrap()
      .then((data) => {
        setRecipes(data);
      });
  }, []);

  const handleClick = () => {
    if (menuId) {
      handleUpdate();
    } else {
      handleCreate();
    }
    navigate(-1);
  };

  return (
    <form className="flex flex-col gap-4 p-4 m-8 border border-gray-300 rounded-lg w-9/12">
      <div className="flex flex-row gap-6 items-center">
        <Input
          className="border border-gray-400 rounded-large w-1/2 h-1/2"
          isRequired
          name="name"
          onBlur={formikMenu.handleBlur}
          errorMessage={formikMenu.touched.name && formikMenu.errors.name}
          isInvalid={!!formikMenu.errors.name && !!formikMenu.touched.name}
          value={formikMenu.values.name}
          onChange={formikMenu.handleChange}
          label="Nombre"
          placeholder="Nombre del menu"
          type="text"
        />
        <DatePicker
          name="dateStart"
          onBlur={formikMenu.handleBlur}
          selected={selectedDate}
          onChange={(date: Date) => {
            setSelectedDate(date);
            formikMenu.setFieldValue("dateStart", date.toString());
          }}
          className="border border-gray-400 rounded-large p-2"
          placeholderText="Fecha de inicio"
        />
        <div>
          {selectedDate && (
            <label>
              Fecha fin:{" "}
              {new Date(
                selectedDate.getTime() + 6 * 24 * 60 * 60 * 1000
              ).toLocaleDateString()}
            </label>
          )}
        </div>
      </div>
      <div className="w-1/2 m-2 border border-gray-300 rounded-lg">
        <Select
          name="recipesId"
          selectionMode="multiple"
          onBlur={formikMenu.handleBlur}
          isRequired
          selectedKeys={formikMenu.values.recipesId.map((recipe) =>
            recipe.toString()
          )}
          onChange={(e) => {
            void formikMenu.setFieldValue(
              "recipesId",
              e.target.value
                .split(",")
                .filter((v) => v)
                .map((value) => parseInt(value))
            );
            setRecipesid([...recipesid, parseInt(e.target.value)]);
          }}
          errorMessage={
            formikMenu.touched.recipesId ? formikMenu.errors.recipesId : ""
          }
          isInvalid={
            !!formikMenu.errors.recipesId && !!formikMenu.touched.recipesId
          }
          label="Recetas"
          placeholder="Selecione las recetas del menu"
        >
          {recipes.map((recipe) => (
            <SelectItem key={recipe.id} value={recipe.id}>
              {recipe.name}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex justify-end m-3">
        <Button
          className="mr-2 border border-gray-300"
          color="danger"
          variant="light"
          onClick={() => navigate(-1)}
        >
          Cancelar
        </Button>
        <Button
          className="cursor-pointer"
          color="primary"
          isDisabled={!formikMenu.isValid || !formikMenu.dirty}
          onClick={handleClick}
        >
          {formikMenu.values.id !== 0 ? "Actualizar" : "Guardar "}
        </Button>
      </div>
    </form>
  );
};
