import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuSchema } from "../../utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ICreateMenu } from "../../types";
import { getRecipes } from "../../../recipe/application";
import { IGetRecipes } from "../../../recipe/types";
import { useAppDispatch } from "../../../../shared/store";
import { createMenus } from "../../application";
import { useSelector } from "react-redux";
import { authSelector } from "../../../auth/redux";

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

  const { user } = useSelector(authSelector);
  const [recipes, setRecipes] = useState<IGetRecipes[]>([]);
  const [recipesid, setRecipesid] = useState<number[]>([]);

  const [selectedDate, setSelectedDate] = useState<Date>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCreate = () => {
    dispatch(
      createMenus({
        name: formikMenu.values.name,
        userId: user!.user.id,
        dateStart: selectedDate!.toString(),
        recipesId: recipesid,
      })
    );
  };

  // function handleUpdate() {
  // dispatch(
  //   updateRecipe({
  //     id: formikRecipe.values.id!,
  //     data: {
  //       name: formikRecipe.values.name,
  //       instructions: formikRecipe.values.instructions,
  //     },
  //   })
  // );
  // }

  useEffect(() => {
    void dispatch(getRecipes())
      .unwrap()
      .then((data) => {
        setRecipes(data);
      });
  }, []);

  return (
    <form className="flex flex-col gap-4 p-4 m-8 border border-gray-300 rounded-lg w-1/2">
      <div className="flex flex-row gap-6 items-center">
        <Input
          className="border border-gray-400 rounded-large w-1/4 h-1/2"
          isRequired
          name="name"
          onBlur={formikMenu.handleBlur}
          errorMessage={formikMenu.touched.name && formikMenu.errors.name}
          isInvalid={!formikMenu.errors.name && !formikMenu.touched.name}
          value={formikMenu.values.name}
          onChange={formikMenu.handleChange}
          label="Nombre"
          placeholder="Nombre de la receta"
          type="text"
        />
        <DatePicker
          name="dateStart"
          onBlur={formikMenu.handleBlur}
          selected={selectedDate}
          onChange={(date: Date) => {
            setSelectedDate(date);
            formikMenu.handleChange;
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
          selectedKeys={(() => {
            return recipes.map((recipe) => recipe.id.toString());
          })()}
          onChange={(e) => {
            void formikMenu.setFieldValue("recipesId", e.target.value);
            setRecipesid([...recipesid, parseInt(e.target.value)]);
          }}
          errorMessage={
            formikMenu.touched.recipesId ? formikMenu.errors.recipesId : ""
          }
          isInvalid={
            !!formikMenu.errors.recipesId && !!formikMenu.touched.recipesId
          }
          // value={formikMenu.values.recipesId}
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
          onClick={() => {
            navigate("-1");
          }}
        >
          Cancelar
        </Button>
        <Button
          className="cursor-pointer"
          color="primary"
          isDisabled={!formikMenu.errors.name && !formikMenu.touched.name}
          onClick={() => {
            console.log("aki");
            // if (formikMenu.values.id !== 0) {
            //   console.log(formikMenu.values);
            //   handleUpdate;
            // } else {
            handleCreate();
            // }
          }}
        >
          Guardar
        </Button>
      </div>
    </form>
  );
};
