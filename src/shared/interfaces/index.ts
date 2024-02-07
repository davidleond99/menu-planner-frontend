import { FlowbiteStateColors } from "flowbite-react";

export interface IAppState {
  loading: boolean;
  showMsg: boolean;
  message: string;
  typeMsg: keyof FlowbiteStateColors;
  lang: string;
}

export interface IShowMsg {
  type?: keyof FlowbiteStateColors;
  msg?: string;
}

export interface INavLink {
  className?: string;
  end?: boolean;
  disabled?: boolean;
  label: string;
  labelStyle?: string;
  to: string;
}