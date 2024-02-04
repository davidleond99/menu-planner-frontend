import { faSignOut, faBars } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction, FC, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, Icon } from "../../../../shared";
import { logout } from "../../../auth";
import { Avatar } from "../Avatar";


interface TopbarProps {
  setShowSideBar: Dispatch<SetStateAction<boolean>>;
  showSideBar: boolean;
}

export const Topbar: FC<TopbarProps> = ({
  setShowSideBar,
  showSideBar,
}): ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <nav className="relative z-10 flex h-16 items-center justify-end bg-white shadow lg:items-stretch lg:justify-between">
      <div className="hidden w-full pr-6 lg:flex">
        <div className="hidden h-full w-1/2 items-center pl-6 pr-24 lg:flex"></div>
        <div className="hidden w-1/2 lg:flex">
          <div className="flex w-full items-center justify-end pl-8">
            <Avatar />
            <p className="mx-3 text-sm text-gray-800">Profile</p>
          </div>

          <Icon
            onClick={() => {
              localStorage.removeItem("token");
              dispatch(logout());
              navigate("/auth/login", { replace: true });
            }}
            className="mt-6 mr-2 ml-2 cursor-pointer"
            icon={faSignOut}
          />
        </div>
      </div>
      <div
        className="visible relative mr-8 cursor-pointer text-gray-600 lg:hidden"
        onClick={() => {
          setShowSideBar(!showSideBar);
        }}
      >
        {showSideBar ? " " : <Icon icon={faBars} />}
      </div>
    </nav>
  );
};
