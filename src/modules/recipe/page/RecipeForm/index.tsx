import { useEffect, useState } from "react";
import { Button, Input, Textarea, Select, SelectItem } from "@nextui-org/react";
import { CategoriaAlimento } from "../../../../shared/enums";
import { useAppDispatch } from "../../../../shared/store";
import { getIngredients } from "../../../ingredients/application";
import { IGetIngredients } from "../../../ingredients/types";
import {
  createRecipes,
  getRecipeById,
  recipesSelector,
  updateRecipe,
} from "../../application";
import { useFormik } from "formik";
import { ICreateRecipe, IGetRecipes } from "../../types";
import { RecipeSchema } from "../../utils";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { showMsg } from "../../../../shared/redux/message";

export const RecipeForm = () => {
  const formikRecipe = useFormik<IGetRecipes>({
    initialValues: {
      id: 0,
      name: "",
      instructions: "",
      ingredients: [],
    },
    onSubmit: async () => {},
    validationSchema: RecipeSchema,
  });
  const { recipes } = useSelector(recipesSelector);
  const { recipeId } = useParams();
  const [categoriesIngredients, setCategoriesIngredients] = useState<
    { categoria: string; ingredientes: IGetIngredients[] }[]
  >([]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (recipeId) {
      handleUpdate();
    } else {
      handleCreate();
    }
    navigate(-1);
  };

  const loadInitialData = async () => {
    try {
      if (recipeId) {
        const recipeGet = await dispatch(
          getRecipeById(parseInt(recipeId))
        ).unwrap();

        if (recipeGet) {
          const recipeu = recipes.find((recipe) => {
            return recipe.id === recipeGet.id;
          });
          if (recipeu) {
            formikRecipe.resetForm({
              values: {
                id: recipeu.id,
                name: recipeu.name,
                instructions: recipeu.instructions,
                ingredients: recipeu.ingredients,
              },
            });
          }
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
    void dispatch(getIngredients())
      .unwrap()
      .then((data) => {
        const categorias = Object.entries(CategoriaAlimento).map(([value]) => ({
          categoria: value,
          ingredientes: data.filter(
            (ingredient) => ingredient.category === value
          ),
        }));
        setCategoriesIngredients(categorias);
      });
  }, [dispatch]);

  useEffect(() => {
    void loadInitialData();
  }, [recipeId]);

  const handleCreate = () => {
    const ids = formikRecipe.values.ingredients.map(
      (ingredient) => ingredient.id
    );

    const recipe: ICreateRecipe = {
      name: formikRecipe.values.name,
      instructions: formikRecipe.values.instructions,
      ingredientsId: ids,
    };

    try {
      dispatch(createRecipes(recipe));
      dispatch(
        showMsg({
          type: "success",
          msg: "Receta creada",
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

  const handleUpdate = () => {
    try {
      dispatch(
        updateRecipe({
          id: formikRecipe.values.id!,
          data: {
            name: formikRecipe.values.name,
            instructions: formikRecipe.values.instructions,
            ingredientsId: formikRecipe.values.ingredients.map(
              (ingredient) => ingredient.id
            ),
          },
        })
      );
      dispatch(
        showMsg({
          type: "success",
          msg: "Receta actualizada",
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

  return (
    <form className="flex flex-col gap-4 p-4 m-8 border border-gray-300 rounded-lg">
      <div className="flex flex-row gap-6">
        <Input
          className="border border-gray-400 rounded-large w-1/4 h-1/2"
          isRequired
          onBlur={formikRecipe.handleBlur}
          errorMessage={formikRecipe.touched.name && formikRecipe.errors.name}
          isInvalid={!!formikRecipe.errors.name && !!formikRecipe.touched.name}
          value={formikRecipe.values.name}
          onChange={(e) =>
            void formikRecipe.setFieldValue("name", e.target.value)
          }
          label="Nombre"
          name="name"
          placeholder="Nombre de la receta"
          type="text"
        />
        <Textarea
          onBlur={formikRecipe.handleBlur}
          isRequired
          name="instructions"
          errorMessage={
            formikRecipe.touched.instructions
              ? formikRecipe.errors.instructions
              : ""
          }
          className="border border-gray-400 rounded-large w-1/3"
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
      </div>
      <div className="flex flex-row gap-2 items-center justify-start mt-4">
        {categoriesIngredients.map((item, index) => (
          <div key={index} className="w-full max-w-xl mr-4">
            <h3>{item.categoria}</h3>
            <Select
              isRequired
              selectedKeys={formikRecipe?.values.ingredients
                .filter((ingredient) => ingredient.category === item.categoria)
                .map((ingredient) => ingredient.id.toString())}
              onBlur={formikRecipe.handleBlur}
              onChange={async (e) => {
                const selectedIngredients: string[] = e.target.value.split(`,`);
                let newIngredients: IGetIngredients[] = [];

                selectedIngredients.forEach((selectedIngredient) => {
                  const findedIngredient: IGetIngredients | undefined =
                    item.ingredientes.find(
                      (ingredient) =>
                        ingredient.id?.toString() === selectedIngredient
                    );
                  if (findedIngredient) newIngredients.push(findedIngredient);
                });
                newIngredients = [
                  ...newIngredients,
                  ...formikRecipe.values.ingredients.filter(
                    (ingredient) => ingredient.category !== item.categoria
                  ),
                ];
                await formikRecipe.setFieldValue("ingredients", newIngredients);
              }}
              selectionMode="multiple"
              className="border border-gray-300 rounded-large"
            >
              {item.ingredientes.map((ingrediente) => (
                <SelectItem
                  key={ingrediente.id!.toString()}
                  value={ingrediente.id!.toString()}
                >
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
          onClick={() => navigate(-1)}
        >
          Cancelar
        </Button>
        <Button
          className="cursor-pointer"
          color="primary"
          isDisabled={!formikRecipe.isValid || !formikRecipe.dirty}
          onClick={handleClick}
        >
          {formikRecipe.values.id !== 0 ? "Actualizar" : "Guardar "}
        </Button>
      </div>
    </form>
  );
};
