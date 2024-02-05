import { useEffect, useState } from "react";
import {
  createIngredient,
  deleteIngredient,
  getIngredients,
  ingredientsSelector,
  updateIngredient,
} from "../../application";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { useAppDispatch } from "../../../../shared/store";
import { ICreateIngredient, IGetIngredients } from "../../types";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../../../../shared/components";
import { showMessage } from "../../../../shared/redux/message";
import { useFormik } from "formik";
import { IngredientSchema } from "../../utils";
import { CategoriaAlimento, UnidadMedida } from "../../../../shared/utils";
import { useSelector } from "react-redux";

export const IngredientsList = () => {
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

  const [ingredients, setIngredients] = useState<IGetIngredients[]>([]);
  const [name, setName] = useState("");
  const [unity, setUnity] = useState("");
  const [category, setCategory] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { loadingIngredients } = useSelector(ingredientsSelector);

  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getIngredients())
      .unwrap()
      .then((data) => {
        setIngredients(data);
      });
  }, []);

  const handleDelete = async (ingredientId: number) => {
    try {
      await dispatch(deleteIngredient(ingredientId));

      setIngredients((prevIngredients) =>
        prevIngredients.filter((ingredient) => ingredient.id !== ingredientId)
      );
    } catch (error) {
      dispatch(
        showMessage({
          severity: "error",
          summary: "Error deleting ingredient:",
        })
      );
    }
  };
  const unityOptions = Object.keys(UnidadMedida).map((key) => ({
    value: key,
    label: UnidadMedida[key as keyof typeof UnidadMedida],
  }));
  const categoryOptions = Object.keys(CategoriaAlimento).map((key) => ({
    value: key,
    label: CategoriaAlimento[key as keyof typeof CategoriaAlimento],
  }));
  return (
    <div className="flex flex-row m-4 gap-12 w-full ">
      <div className="flex flex-wrap justify-center align-middle items-center">
        <Button
          className=""
          onPress={() => {
            setName("");
            setUnity("");
            setCategory("");
            onOpen();
          }}
        >
          Añadir Ingrediente
        </Button>
      </div>
      <Table
        className="w-1/2 mt-6 ml-4 flex flex-wrap justify-center content-center"
        aria-label="Example table with dynamic content"
      >
        <TableHeader className="">
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Categoría</TableColumn>
          <TableColumn>Unidad</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {ingredients.length > 0 ? (
            ingredients.map((ingredient) => (
              <TableRow key={ingredient.id}>
                <TableCell className=" justify-start content-start">
                  {ingredient.name}
                </TableCell>
                <TableCell className=" justify-start content-start">
                  {ingredient.category}
                </TableCell>
                <TableCell className=" justify-start content-start">
                  {ingredient.unity}
                </TableCell>
                <TableCell>
                  <div className=" justify-start content-start">
                    <Button
                      isIconOnly
                      onPress={() => {
                        void formikIngredient.setFieldValue(
                          "id",
                          ingredient.id
                        );

                        void formikIngredient.setFieldValue(
                          "name",
                          ingredient.name
                        );
                        void formikIngredient.setFieldValue(
                          "unity",
                          ingredient.unity
                        );
                        void formikIngredient.setFieldValue(
                          "category",
                          ingredient.category
                        );
                        setName(ingredient.name);
                        setUnity(ingredient.unity);
                        setCategory(ingredient.category);
                        console.log(formikIngredient.values.id);
                        onOpen();
                      }}
                      size="sm"
                      className="w-1/4"
                      color="primary"
                      endContent={<Icon icon={faEdit} />}
                    ></Button>
                    <Button
                      className="ml-4 w-1/4"
                      isIconOnly
                      size="sm"
                      onClick={() => {
                        handleDelete(ingredient.id!);
                      }}
                      color="danger"
                      endContent={<Icon icon={faTrash} />}
                    ></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>No hay datos</TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4">
                  <Input
                    onBlur={formikIngredient.handleBlur}
                    isRequired
                    errorMessage={
                      formikIngredient.touched.name
                        ? formikIngredient.errors.name
                        : ""
                    }
                    isInvalid={
                      !!formikIngredient.errors.name &&
                      !!formikIngredient.touched.name
                    }
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      void formikIngredient.setFieldValue(
                        "name",
                        e.target.value
                      );
                    }}
                    label="Nombre"
                    placeholder="Nombre del ingrediente"
                    type="text"
                  />
                  <Select
                    name="category"
                    onBlur={formikIngredient.handleBlur}
                    isRequired
                    onChange={(e) => {
                      setCategory(e.target.value);
                      void formikIngredient.setFieldValue(
                        "category",
                        e.target.value
                      );
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
                    value={category}
                    label="Categoría"
                    placeholder="Categoría del ingrediente"
                  >
                    {categoryOptions.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    name="unity"
                    onBlur={formikIngredient.handleBlur}
                    isRequired
                    onChange={(e) => {
                      setUnity(e.target.value);
                      void formikIngredient.setFieldValue(
                        "unity",
                        e.target.value
                      );
                    }}
                    errorMessage={
                      formikIngredient.touched.unity
                        ? formikIngredient.errors.unity
                        : ""
                    }
                    isInvalid={
                      !!formikIngredient.errors.unity &&
                      !!formikIngredient.touched.unity
                    }
                    value={unity}
                    label="Unidad"
                    placeholder="Unidad de medida"
                  >
                    {unityOptions.map((unity) => (
                      <SelectItem key={unity.value} value={unity.value}>
                        {unity.label}
                      </SelectItem>
                    ))}
                  </Select>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  onClick={() => {
                    setName("");
                    setUnity("");
                  }}
                  variant="light"
                  onPress={onClose}
                >
                  Cancelar
                </Button>
                <Button
                  isLoading={loadingIngredients}
                  disabled={!formikIngredient.isValid}
                  color="primary"
                  onClick={() => {
                    if (formikIngredient.values.id !== 0) {
                      console.log(formikIngredient.values);
                      dispatch(
                        updateIngredient({
                          id: formikIngredient.values.id!,
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
                          setName("");
                          setUnity("");
                          setCategory("");
                        });
                    } else {
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
                          setName("");
                          setUnity("");
                          setCategory("");
                        });
                    }
                  }}
                  onPress={onClose}
                >
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
