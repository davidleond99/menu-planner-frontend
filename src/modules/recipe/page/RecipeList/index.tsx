import { useEffect, useState } from "react";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useAppDispatch } from "../../../../shared/store";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../../../../shared/components";
import { showMessage } from "../../../../shared/redux/message";
import { useFormik } from "formik";
import { ICreateRecipe, IGetRecipes } from "../../types";
import { RecipeSchema } from "../../utils";
import {
  createRecipes,
  deleteRecipes,
  getRecipes,
  updateRecipe,
} from "../../application";

export const RecipeList = () => {
  const formikRecipe = useFormik<ICreateRecipe>({
    initialValues: {
      name: "",
      instructions: "",
    },
    onSubmit: async () => {},
    validationSchema: RecipeSchema,
  });

  const [recipes, setRecipes] = useState<IGetRecipes[]>([]);
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getRecipes())
      .unwrap()
      .then((data) => {
        setRecipes(data);
      });
  }, []);

  const handleDelete = async (recipeId: number) => {
    try {
      await dispatch(deleteRecipes(recipeId));

      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== recipeId)
      );
    } catch (error) {
      dispatch(
        showMessage({
          severity: "error",
          summary: "Error deleting recipe",
        })
      );
    }
  };
  return (
    <div className="flex flex-row m-4 gap-12 w-full ">
      <div className="flex flex-wrap justify-center align-middle items-center">
        <Button className="" onPress={onOpen}>
          Añadir Receta
        </Button>
      </div>
      <Table
        className="w-1/2 mt-6 ml-4 flex flex-wrap justify-center content-center"
        aria-label="Example table with dynamic content"
      >
        <TableHeader className="">
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Instrucciones</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <TableRow key={recipe.id}>
                <TableCell className=" justify-start content-start">
                  {recipe.name}
                </TableCell>
                <TableCell className=" justify-start content-start">
                  {recipe.instructions}
                </TableCell>

                <TableCell>
                  <div className=" justify-start content-start">
                    <Button
                      isIconOnly
                      onPress={() => {
                        void formikRecipe.setFieldValue("id", recipe.id);

                        void formikRecipe.setFieldValue("name", recipe.name);
                        void formikRecipe.setFieldValue(
                          "unity",
                          recipe.instructions
                        );

                        setName(recipe.name);
                        setInstructions(recipe.instructions);
                        console.log(formikRecipe.values.id);
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
                        handleDelete(recipe.id);
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
                    onBlur={formikRecipe.handleBlur}
                    isRequired
                    errorMessage={
                      formikRecipe.touched.name ? formikRecipe.errors.name : ""
                    }
                    isInvalid={
                      !!formikRecipe.errors.name && !!formikRecipe.touched.name
                    }
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      void formikRecipe.setFieldValue("name", e.target.value);
                    }}
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
                    isInvalid={
                      !!formikRecipe.errors.instructions &&
                      !!formikRecipe.touched.instructions
                    }
                    value={instructions}
                    onChange={(e) => {
                      setInstructions(e.target.value);
                      void formikRecipe.setFieldValue(
                        "instructions",
                        e.target.value
                      );
                    }}
                    label="Instrucciones"
                    placeholder="Instrucciones de elaboración"
                    type="text"
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  onClick={() => {
                    setName("");
                    setInstructions("");
                  }}
                  variant="light"
                  onPress={onClose}
                >
                  Cancelar
                </Button>
                <Button
                  disabled={!formikRecipe.isValid}
                  color="primary"
                  onClick={() => {
                    if (formikRecipe.values.id !== 0) {
                      console.log(formikRecipe.values);
                      dispatch(
                        updateRecipe({
                          id: formikRecipe.values.id!,
                          data: {
                            name: formikRecipe.values.name,
                            instructions: formikRecipe.values.instructions,
                          },
                        })
                      )
                        .unwrap()
                        .then((data) => {
                          const index = recipes.findIndex(
                            (recipe) => recipe.id === data.id
                          );

                          if (index !== -1) {
                            const updatedRecipes = [...recipes];
                            updatedRecipes[index] = data;
                            setRecipes(updatedRecipes);
                          }

                          setName("");
                          setInstructions("");
                        });
                    } else {
                      dispatch(
                        createRecipes({
                          name: formikRecipe.values.name,
                          instructions: formikRecipe.values.instructions,
                        })
                      )
                        .unwrap()
                        .then((data) => {
                          setRecipes([...recipes, data]);
                          setName("");
                          setInstructions("");
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
