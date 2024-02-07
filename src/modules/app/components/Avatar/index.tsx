import { User } from "@nextui-org/react";
import { FC } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../../auth/redux";

export interface IAvatarProps {
  status?: string;
}

export const Avatar: FC<IAvatarProps> = () => {
  const { user } = useSelector(authSelector);

  return (
    <User
      name={user?.user.name}
      avatarProps={{
        src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      }}
    />
  );
};
