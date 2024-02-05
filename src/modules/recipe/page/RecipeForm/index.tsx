import { useEffect, useState } from "react";
import { Button, Input, Textarea, Select, SelectItem } from "@nextui-org/react";
import { CategoriaAlimento } from "../../../../shared/enums";
import { useAppDispatch } from "../../../../shared/store";
import { getIngredients } from "../../../ingredients/application";
import { IGetIngredients } from "../../../ingredients/types";
import { createRecipes } from "../../application";
import { useFormik } from "formik";
import { ICreateRecipe } from "../../types";
import { RecipeSchema } from "../../utils";
import { useNavigate } from "react-router-dom";

export const RecipeForm = () => {
  const formikRecipe = useFormik<ICreateRecipe>({
    initialValues: {
      id: 0,
      name: "",
      instructions: "",
      ingredientsId: [],
    },
    onSubmit: async () => {},
    validationSchema: RecipeSchema,
  });

  const navigate = useNavigate();

  const [categoriasEIngredientes, setCategoriasEIngredientes] = useState<
    { categoria: string; ingredientes: IGetIngredients[] }[]
  >([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getIngredients())
      .unwrap()
      .then((data) => {
        const categorias = Object.entries(CategoriaAlimento).map(([value]) => ({
          categoria: value,
          ingredientes: data.filter(
            (ingredient) => ingredient.category === value
          ),
        }));
        setCategoriasEIngredientes(categorias);
      });
  }, [dispatch]);

  return (
    <form className="flex flex-col gap-4 p-4 m-8 border border-gray-300 rounded-lg">
      <Input
        className="border border-gray-300 rounded-large"
        isRequired
        onBlur={formikRecipe.handleBlur}
        errorMessage={formikRecipe.touched.name ? formikRecipe.errors.name : ""}
        isInvalid={!!formikRecipe.errors.name && !!formikRecipe.touched.name}
        value={formikRecipe.values.name}
        onChange={(e) =>
          void formikRecipe.setFieldValue("name", e.target.value)
        }
        label="Nombre"
        placeholder="Nombre de la receta"
        type="text"
      />
      <Textarea
        onBlur={formikRecipe.handleBlur}
        isRequired
        errorMessage={
          formikRecipe.touched.instructions
            ? formikRecipe.errors.instructions
            : ""
        }
        className="border border-gray-300 rounded-large"
        isInvalid={
          !!formikRecipe.errors.instructions &&
          !!formikRecipe.touched.instructions
        }
        value={formikRecipe.values.instructions}
        onChange={(e) =>
          void formikRecipe.setFieldValue("instructions", e.target.value)
        }
        label="Instrucciones"
        placeholder="Instrucciones de elaboración"
        type="text"
      />
      <div className="flex flex-row gap-2 items-center justify-start mt-4">
        {categoriasEIngredientes.map((item, index) => (
          <div key={index} className="w-full max-w-xl mr-4">
            <h3>{item.categoria}</h3>
            <Select
              selectionMode="multiple"
              className="border border-gray-300 rounded-large"
              onChange={(e) => {
                formikRecipe.setFieldValue("ingredientsId", [
                  ...formikRecipe.values.ingredientsId,
                  e.target.value,
                ]);
              }}
            >
              {item.ingredientes.map((ingrediente) => (
                <SelectItem key={ingrediente.id!} value={ingrediente.id}>
                  {ingrediente.name}
                </SelectItem>
              ))}
            </Select>
          </div>
        ))}
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
          disabled={!formikRecipe.isValid}
          onClick={() => {
            if (formikRecipe.values.id !== 0) {
              console.log(formikRecipe.values);
              // dispatch(
              //   updateRecipe({
              //     id: formikRecipe.values.id!,
              //     data: {
              //       name: formikRecipe.values.name,
              //       instructions: formikRecipe.values.instructions,
              //     },
              //   })
              // );
            } else {
              dispatch(
                createRecipes({
                  name: formikRecipe.values.name,
                  instructions: formikRecipe.values.instructions,
                  ingredientsId: formikRecipe.values.ingredientsId,
                })
              );
            }
          }}
        >
          Guardar
        </Button>
      </div>
    </form>
  );
};
