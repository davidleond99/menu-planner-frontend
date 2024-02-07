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
import {
  faDotCircle,
  faEdit,
  faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../../../../shared/components";
import { useNavigate } from "react-router-dom";
import { getMenus, deleteMenu } from "../../../menu/application";
import { IGetMenus } from "../../../menu/types";
import { showMsg } from "../../../../shared/redux/message";

export const MenuList = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [viewMenus, setViewMenus] = useState<IGetMenus>();

  const [menus, setMenus] = useState<IGetMenus[]>([]);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getMenus())
      .unwrap()
      .then((data) => {
        setMenus(data);
      });
  }, []);

  const handleDelete = async (menuId: number) => {
    try {
      await dispatch(deleteMenu(menuId));
      setMenus((prevMenus) => prevMenus.filter((menu) => menu.id !== menuId));
    } catch (error) {
      dispatch(
        showMsg({
          type: 'success',
            msg: 'Proveedor asignado',
        })
      );
    }
  };

  function sumDaysToDate(dateString: string, days: number) {
    const dateObject = new Date(dateString);
    dateObject.setDate(dateObject.getDate() + days);
    return dateObject.toISOString().split("T")[0];
  }

  return (
    <div className="flex flex-col items-center w-full mt-4">
      <Button
        color="primary"
        onClick={() => {
          navigate("new");
        }}
      >
        Añadir Menu
      </Button>

      <div className="w-full p-8">
        <Table aria-label="Example table with dynamic content">
          <TableHeader className="">
            <TableColumn>Nombre</TableColumn>
            <TableColumn>Fecha de inicio</TableColumn>
            <TableColumn>Fecha de fin</TableColumn>
            <TableColumn>Acciones</TableColumn>
          </TableHeader>
          <TableBody>
            {menus.length > 0 ? (
              menus.map((menu) => (
                <TableRow key={menu.id}>
                  <TableCell className=" justify-start content-start">
                    {menu.name}
                  </TableCell>
                  <TableCell className=" justify-start content-start">
                    {new Date(menu.dateStart).toDateString()}
                  </TableCell>
                  <TableCell className=" justify-start content-start">
                    {new Date(sumDaysToDate(menu.dateStart, 6)).toDateString()}
                  </TableCell>

                  <TableCell>
                    <div className=" justify-start content-start">
                      <Tooltip content="Ver menu">
                        <Button
                          aria-label="Ver menu"
                          isIconOnly
                          onClick={() => {}}
                          onPress={() => {
                            onOpen();
                            setViewMenus(menu);
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
                          onClick={() => {
                            navigate(`edit/${menu.id}`);
                          }}
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
                            handleDelete(menu.id);
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
                  {` Detalles de la Receta  ' ${viewMenus?.name} '`}
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-row">
                      <p>{`Fecha de inicio:`}</p>
                      <p className="font-semibold ml-1">{`${viewMenus?.dateStart}`}</p>
                    </div>
                    <div className="flex flex-row">
                      <p>{`Fecha de fin:`}</p>
                      <p className="font-semibold ml-1">
                        {sumDaysToDate(viewMenus!.dateStart, 6)}
                      </p>
                    </div>
                  </div>
                  <Divider />
                  {viewMenus?.recipes.map((recipe) => {
                    return (
                      <div
                        key={recipe.id}
                        className="flex justify-start content-start"
                      >
                        <Icon
                          icon={faDotCircle}
                          size="2xs"
                          className="mr-1 mt-3"
                        />
                        <div className="flex m-1">{recipe.name}</div>
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
