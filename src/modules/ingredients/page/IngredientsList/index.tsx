import { useEffect, useState } from "react";
import { deleteIngredient, getIngredients } from "../../application";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { useAppDispatch } from "../../../../shared/store";
import { IGetIngredients } from "../../types";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../../../../shared/components";
import { showMessage } from "../../../../shared/redux/message";
import { useNavigate } from "react-router-dom";

export const IngredientsList = () => {
  const [ingredients, setIngredients] = useState<IGetIngredients[]>([]);

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

  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center w-full">
      <Button color="primary" className="mt-4" onClick={() => navigate("new")}>
        Añadir Ingrediente
      </Button>

      <div className="w-full p-8">
        <Table aria-label="Example table with dynamic content">
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
                      <Tooltip content="Editar">
                        <Button
                          isIconOnly
                          aria-label="Editar"
                          onClick={() => {
                            navigate(`edit/${ingredient.id}`);
                          }}
                          size="sm"
                          className="w-1/4 bg-green-400"
                          endContent={<Icon icon={faEdit} />}
                        ></Button>
                      </Tooltip>
                      <Tooltip content="Eliminar">
                        <Button
                          aria-label="Eliminar"
                          className="ml-4 w-1/4"
                          isIconOnly
                          size="sm"
                          onClick={() => {
                            handleDelete(ingredient.id!);
                          }}
                          color="danger"
                          endContent={<Icon icon={faTrash} />}
                        ></Button>
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
                <TableCell> </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
