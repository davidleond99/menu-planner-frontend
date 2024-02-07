import { Input, Select, SelectItem, Button } from "@nextui-org/react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { UnidadMedida, CategoriaAlimento } from "../../../../shared/enums";
import {
  ingredientsSelector,
  createIngredient,
  updateIngredient,
  getIngredientById,
} from "../../application";
import { ICreateIngredient, IGetIngredients } from "../../types";
import { IngredientSchema } from "../../utils";
import { useAppDispatch } from "../../../../shared/store";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showMsg } from "../../../../shared/redux/message";

export const IngredientsForm = () => {
  const formikIngredient = useFormik<ICreateIngredient>({
    initialValues: {
      id: 0,
      name: "",
      category: "",
      unity: "",
    },
    onSubmit: async () => {},
    validationSchema: IngredientSchema,
  });
  const { loadingIngredients } = useSelector(ingredientsSelector);

  const unityOptions = Object.keys(UnidadMedida).map((key) => ({
    value: key,
    label: UnidadMedida[key as keyof typeof UnidadMedida],
  }));
  const categoryOptions = Object.keys(CategoriaAlimento).map((key) => ({
    value: key,
    label: CategoriaAlimento[key as keyof typeof CategoriaAlimento],
  }));

  const dispatch = useAppDispatch();
  const { ingredientId } = useParams();

  function handleSubmit(): void {
    if (formikIngredient.values.id !== 0) {
      handleUpdate();
    } else {
      handleCreate();
    }
    formikIngredient.resetForm({
      values: {
        id: 0,
        name: "",
        category: "",
        unity: "",
      },
    });
    navigate(-1);
  }
  const handleCreate = () => {
    dispatch(
      createIngredient({
        name: formikIngredient.values.name,
        category: formikIngredient.values.category,
        unity: formikIngredient.values.unity,
      })
    )
      .unwrap()
      .then((data) => {
        setIngredients([...ingredients, data]);
        formikIngredient.resetForm();
      })
      .catch(console.log);
    dispatch(
      showMsg({
        type: "success",
        msg: "Proveedor asignado",
      })
    );
  };

  const handleUpdate = () => {
    dispatch(
      updateIngredient({
        id: parseInt(ingredientId!),
        data: {
          name: formikIngredient.values.name,
          category: formikIngredient.values.category,
          unity: formikIngredient.values.unity,
        },
      })
    )
      .unwrap()
      .then((data) => {
        const index = ingredients.findIndex(
          (ingredient) => ingredient.id === data.id
        );
        if (index !== -1) {
          const updatedIngredients = [...ingredients];
          updatedIngredients[index] = data;
          setIngredients(updatedIngredients);
        }
      })
      .catch(console.log);
  };

  function handleCancel(): void {
    formikIngredient.resetForm({
      values: {
        id: 0,
        name: "",
        category: "",
        unity: "",
      },
    });
    navigate("ingredients");
  }
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState<IGetIngredients[]>([]);

  const loadInitialData = async () => {
    try {
      if (ingredientId) {
        const ingredient = await dispatch(
          getIngredientById(parseInt(ingredientId))
        ).unwrap();
        formikIngredient.resetForm({
          values: {
            name: ingredient.name,
            category: ingredient.category,
            unity: ingredient.unity,
          },
        });
      }
    } catch (error) {
      dispatch(
        showMsg({
          type: "success",
          msg: "Proveedor asignado",
        })
      );
    }
  };

  useEffect(() => {
    void loadInitialData();
  }, [ingredientId]);

  return (
    <form className="flex flex-col gap-4 p-4 m-8 border border-gray-300 rounded-lg w-1/2">
      <Input
        className="border border-gray-400 rounded-large w-1/4 h-1/2"
        name="name"
        onBlur={formikIngredient.handleBlur}
        isRequired
        errorMessage={
          formikIngredient.touched.name ? formikIngredient.errors.name : ""
        }
        isInvalid={
          !!formikIngredient.errors.name && !!formikIngredient.touched.name
        }
        value={formikIngredient.values.name}
        onChange={formikIngredient.handleChange}
        label="Nombre"
        placeholder="Nombre del ingrediente"
        type="text"
      />
      <Select
        className="border border-gray-300 rounded-large w-1/2"
        name="category"
        onBlur={formikIngredient.handleBlur}
        isRequired
        selectedKeys={[formikIngredient.values.category]}
        onChange={(e) => {
          void formikIngredient.setFieldValue("category", e.target.value);
        }}
        errorMessage={
          formikIngredient.touched.category
            ? formikIngredient.errors.category
            : ""
        }
        isInvalid={
          !!formikIngredient.errors.category &&
          !!formikIngredient.touched.category
        }
        label="Categoría"
        placeholder="Categoría del ingrediente"
      >
        {categoryOptions.map((category) => (
          <SelectItem key={category.value} value={category.value}>
            {category.value}
          </SelectItem>
        ))}
      </Select>
      <Select
        className="border border-gray-300 rounded-large w-1/2"
        name="unity"
        onBlur={formikIngredient.handleBlur}
        isRequired
        selectedKeys={[formikIngredient.values.unity]}
        onChange={(e) => {
          void formikIngredient.setFieldValue("unity", e.target.value);
        }}
        errorMessage={
          formikIngredient.touched.unity ? formikIngredient.errors.unity : ""
        }
        isInvalid={
          !!formikIngredient.errors.unity && !!formikIngredient.touched.unity
        }
        value={formikIngredient.values.unity}
        label="Unidad"
        placeholder="Unidad de medida"
      >
        {unityOptions.map((unity) => (
          <SelectItem key={unity.value} value={unity.value}>
            {unity.label}
          </SelectItem>
        ))}
      </Select>
      <div className="flex justify-end m-3">
        <Button color="danger" onClick={handleCancel} variant="light">
          Cancelar
        </Button>
        <Button
          isLoading={loadingIngredients}
          isDisabled={!formikIngredient.isValid || !formikIngredient.dirty}
          color="primary"
          onClick={handleSubmit}
        >
          {formikIngredient.values.id !== 0 ? "Actualizar" : "Guardar "}
        </Button>
      </div>
    </form>
  );
};
