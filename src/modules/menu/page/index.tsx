import React from "react";
import { Button } from "../../../shared/components/Button";
import { useAppDispatch } from "../../../shared/store";
import { logout } from "../../auth/redux";

export const Menu = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-wrap items-center justify-center mt-24">
      <Button
        className="bg-slate-500"
        onClick={() => {
          void dispatch(logout());
        }}
      >
        Salir
      </Button>
    </div>
  );
};
