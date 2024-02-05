import { useEffect, useState } from "react";

import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { useAppDispatch } from "../../../../shared/store";
import { faEdit, faEye, faListUl, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../../../../shared/components";
import { showMessage } from "../../../../shared/redux/message";
import { IGetRecipes } from "../../types";
import { deleteRecipes, getRecipes } from "../../application";
import { useNavigate } from "react-router-dom";

export const RecipeList = () => {
  const [recipes, setRecipes] = useState<IGetRecipes[]>([]);
  const [viewRecipes, setViewRecipes] = useState<IGetRecipes>();
  const navigate = useNavigate();
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
    <div className="flex flex-col items-center w-full mt-4">
      <Button
        color="primary"
        onClick={() => {
          navigate("form");
        }}
      >
        Añadir Receta
      </Button>

      <div className="w-full p-8">
        <Table aria-label="Example table with dynamic content">
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
                      <Tooltip content="Ver ingredientes">
                        <Button
                          aria-label="Ver ingredientes"
                          isIconOnly
                          onClick={() => {
                            console.log(recipe);
                          }}
                          onPress={() => {
                            onOpen();
                            setViewRecipes(recipe);
                          }}
                          size="sm"
                          className="w-1/4 mr-4 bg-indigo-400"
                          endContent={<Icon icon={faEye} />}
                        />
                      </Tooltip>
                      <Tooltip content="Editar">
                        <Button
                          isIconOnly
                          aria-label="Editar"
                          onPress={() => {}}
                          size="sm"
                          className="w-1/4 bg-green-400"
                          endContent={<Icon icon={faEdit} />}
                        />
                      </Tooltip>
                      <Tooltip content="Eliminar">
                        <Button
                          aria-label="Eliminar"
                          className="ml-4 w-1/4"
                          isIconOnly
                          size="sm"
                          onClick={() => {
                            handleDelete(recipe.id);
                          }}
                          color="danger"
                          endContent={<Icon icon={faTrash} />}
                        />
                      </Tooltip>
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

        <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Detalles de la Receta
                </ModalHeader>
                <ModalBody>
                <div className="flex flex-row justify-start content-start">
                  <p>{viewRecipes?.instructions}</p>
                </div>
                <Divider/>
                  {viewRecipes?.ingredients.map((ingredient) => {
                    return (
                      <div className="flex justify-start content-start">
                        <Icon icon={faListUl} className="mr-1 mt-2"/>
                        <div className="flex m-1">{ingredient.name}</div>
                        {/* <div className="flex p-1 m-1">{ingredient.category}</div>
                        <div className="flex p-1 m-1">{ingredient.unity}</div> */}
                      </div>
                    );
                  })}
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};
