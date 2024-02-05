import { FC } from "react";
import { IButtonProps } from "../../interfaces";

export const Button: FC<IButtonProps> = ({
  className,
  children,
  color,
  ...props
}) => {
  return (
    // <button
    //   {...props}
    //   type={type || "button"}
    //   className={`flex items-center justify-center rounded-none
    //      py-2.5 px-4 text-sm font-medium text-black transition duration-150 ease-in-out disabled:opacity-50
    //   ${className}
    //   ${loading ? "cursor-wait" : ""} `}
    //   disabled={loading || props.disabled}
    // >
    //   {icon ? (
    //     <div className={`${children ? "mr-3" : ""} self-center`}>{icon} </div>
    //   ) : undefined}
    //   {loading ? (
    //     <Icon icon={faSpinner} className="mr-2 animate-spin" />
    //   ) : undefined}
    //   {children}
    // </button>
    <Button {...props} color={color} className={className}>
      {children}
    </Button>
  );
};
