import { FC, ReactElement } from "react";
import { IInputTextProps } from "../../interfaces";

export const InputText: FC<IInputTextProps> = (props): ReactElement => {
  return (
    <div className={`${props.containerclassname}`}>
      <label
        htmlFor={props.name}
        className={`${props.labelClassname} mb-2 text-md tracking-normal text-gray-800 dark:text-gray-800 justify-start flex`}
      >
        {props.label}
        {props.required ? (
          <span className="text-red-500 ml-1">*</span>
        ) : undefined}
      </label>
      <div className="relative">
        {props.icon && (
          <div className="absolute flex h-full cursor-pointer items-center pl-4 text-gray-800 dark:text-gray-800">
            {props.icon}
          </div>
        )}
        <input
          {...props}
          id={props.name}
          min={0}
          className={`flex h-11 w-full items-center border border-${
            props.helpertext ? "red" : "gray"
          }-300 bg-white ${
            props.icon ? "pl-10" : "pl-2"
          } text-md font-normal text-gray-800 focus:border focus:border-blue-700 focus:outline-none dark:border-gray-200 dark:bg-gray-100 dark:text-gray-800 dark:focus:border-blue-700 ${
            props.className
          }`}
        />
      </div>
      {props.helpertext && (
        <div className="mt-2 flex items-center justify-between text-red-400">
          <p className="text-xs leading-3 tracking-normal">
            {props.helpertext}
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-circle-x"
            width={20}
            height={20}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <circle cx={12} cy={12} r={9} />
            <path d="M10 10l4 4m0 -4l-4 4" />
          </svg>
        </div>
      )}
    </div>
  );
};
