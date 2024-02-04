/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
export interface INavLink {
  className?: string;
  end?: boolean;
  disabled?: boolean;
  label: string;
  labelStyle?: string;
  to: string;
}

export interface ITextProps
  extends React.DetailedHTMLProps<
    HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > {
  children: any;
  className?: string;
}

export interface IInputProps {
  label?: string;
  labelClassname?: string;
  containerclassname?: string;
  containerLabelClassName?: string;
}
export interface IInputTextProps
  extends DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    IInputProps {
  helpertext?: any;
  icon?: any;
}

export interface IInputTextAreaProps
  extends DetailedHTMLProps<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    IInputProps {}

export interface ICheckBoxProps
  extends DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    IInputProps {}

export interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  loading?: boolean;
  icon?: any;
  color?: any;
}

export interface ISelectProps extends IInputTextProps {
  value?: any;
  border?: string;
  options: ISelectOption[];
  lodaingOptions?: boolean;
  onChange?: any;
  setFieldTouched?: (
    field: string,
    isTouched?: boolean | undefined,
    shouldValidate?: boolean | undefined
  ) => void;
}

export interface ISelectOption {
  value: string;
  label: string;
}

export interface IUpdate<T> {
  id: string;
  dataUpdate: T;
}

export interface IUpdateList<T> {
  id: string;
  dataUpdate: T[];
}
