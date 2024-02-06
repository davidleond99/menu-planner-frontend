import { Card, CardHeader, Divider, CardBody } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../../../shared/store";
import { getMenus } from "../../application";
import { IGetMenus } from "../../types";
import { IGetIngredients } from "../../../ingredients/types";
import { getIngredients } from "../../../ingredients/application";

export const MenuPrincipal = () => {
  const getDayOfWeek = (date: Date) => {
    const options = { weekday: "long" as const };
    return new Intl.DateTimeFormat("es-ES", options).format(date);
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  const [ingredients, setIngredients] = useState<IGetIngredients[]>([]);

  const dispatch = useAppDispatch();
  const [menus, setMenus] = useState<IGetMenus[]>([]);
  useEffect(() => {
    void dispatch(getMenus())
      .unwrap()
      .then((data) => {
        setMenus(data);
      })
      .catch(console.log);
    void dispatch(getIngredients())
      .unwrap()
      .then((data) => {
        setIngredients(data);
      })
      .catch(console.log);

    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen m-4">
      <div className="w-2/3 h-screen m-4">
        <div className=" w-full h-1/2 justify-center content-center items-center flex ">
          {menus.map((menu) => {
            return (
              <Card key={menu.id} className="m-2 w-1/2 h-80">
                <CardHeader className="text-black text-center justify-center font-semibold bg-teal-200 text-lg ">
                  {menu.name}
                </CardHeader>
                <Divider />
                {menu.dateStart}
                <Divider />
                <CardBody>
                  {menu.recipes.map((recipe) => {
                    return (
                      <p className="text-md m-1" key={recipe.id}>
                        {recipe.name}
                      </p>
                    );
                  })}
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
      <div className="border-large border-teal-200 w-1/3 h-1/2 m-9">
        {" "}
        {/* Cambiado a flex-col */}
        <p className="text-md font-semibold">Lista de la compra</p>
        <div className="mt-4">
          {" "}
          {/* Agregado margen superior */}
          <p className="text-sm">
            Día actual: {getDayOfWeek(currentDate)},{" "}
            {currentDate.toLocaleDateString()}
          </p>
        </div>
        <div className="p-4 flex flex-col">
          <div className="mt-4">
            {" "}
            {ingredients.map((ingredient, index) => (
              <p key={index}>{ingredient.name}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
