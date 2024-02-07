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
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../../../shared/store";
import { getMenuByUserId } from "../../application";
import { IGetMenusAll } from "../../types";
import { IIngredient } from "../../../ingredients/types";
import { Icon } from "../../../../shared/components/Icon";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { authSelector } from "../../../auth/redux";
import { useSelector } from "react-redux";

export const MenuPrincipal = () => {
  const getDayOfWeek = (date: Date) => {
    const options = { weekday: "long" as const };
    return new Intl.DateTimeFormat("es-ES", options).format(date);
  };

  const { user } = useSelector(authSelector);
  const viewShoppingList = (menu: IGetMenusAll) => {
    setSelectedMenu(menu);

    const allIngredients: IIngredient[] = [];
    menu.recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        const existingIngredient = allIngredients.find(
          (item) => item.id === ingredient.id
        );
        if (!existingIngredient) {
          allIngredients.push(ingredient);
        }
      });
    });
    setSelectedIngredientsMenu(allIngredients);
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMenu, setSelectedMenu] = useState<IGetMenusAll>();

  function sumDaysToDate(dateString: string, days: number) {
    const dateObject = new Date(dateString);
    dateObject.setDate(dateObject.getDate() + days);
    return dateObject.toISOString().split("T")[0];
  }
  const [selectedIngredientsMenu, setSelectedIngredientsMenu] = useState<
    IIngredient[]
  >([]);

  const dispatch = useAppDispatch();
  const [menus, setMenus] = useState<IGetMenusAll[]>([]);
  useEffect(() => {
    void dispatch(getMenuByUserId(user!.user.id))
      .unwrap()
      .then((data) => {
        setMenus(data);
        viewShoppingList(data[0]);
      })
      .catch(console.log);

    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 100000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen m-4">
      <div className="w-2/3 h-screen m-4">
        <div className="flex flex-col gap-3 mt-4">
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Nombre</TableColumn>
              <TableColumn>Fecasdasdha de inicio</TableColumn>
              <TableColumn>Fecha de fin</TableColumn>
              <TableColumn>Acciones</TableColumn>
            </TableHeader>
            <TableBody>
              {menus.length > 0 ? (
                menus.map((menu, index) => (
                  <TableRow key={index + 1}>
                    <TableCell>{menu.name}</TableCell>
                    <TableCell>
                      {new Date(menu.dateStart).toDateString()}
                    </TableCell>
                    <TableCell>
                      {" "}
                      {new Date(
                        sumDaysToDate(menu.dateStart, 6)
                      ).toDateString()}
                    </TableCell>
                    <TableCell>
                      <div className=" justify-start content-start">
                        <Tooltip content="Ver lista compra">
                          <Button
                            aria-label="Ver lista compra"
                            isIconOnly
                            onClick={() => {
                              viewShoppingList(menu);
                            }}
                            size="sm"
                            className="w-1/4 mr-4 bg-teal-300"
                            endContent={<Icon icon={faShoppingCart} />}
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
        </div>
      </div>
      <div className="border-large border-teal-200 w-1/3 h-auto m-9">
        {selectedMenu && (
          <div className="mt-4 flex justify-between content-between mr-4">
            <div className="flex flex-col">
              <p className="text-sm ml-2">{selectedMenu?.name}</p>
              <p className="text-xs ml-2">
                Dia de inicio:{" "}
                {new Date(selectedMenu!.dateStart).toDateString()}
              </p>
              <p className="text-xs ml-2">
                Dia de fin:{" "}
                {new Date(
                  sumDaysToDate(selectedMenu!.dateStart, 6)
                ).toDateString()}
              </p>
            </div>
            <p className="text-sm">
              Día actual: {getDayOfWeek(currentDate)},{" "}
              {currentDate.toLocaleDateString()}
            </p>
          </div>
        )}
        <div className="flex flex-row justify-center content-center">
          <p className="text-md font-semibold mt-2 text-xl">
            Lista de la compra
          </p>
          <Icon className="mt-4 ml-2" icon={faShoppingCart}></Icon>
        </div>
        <div className="p-4 flex flex-col">
          <div className="mt-4">
            {selectedIngredientsMenu.map((ingredient, index) => (
              <p className="mt-1 font-mono text-lg" key={index}>
                {ingredient.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
