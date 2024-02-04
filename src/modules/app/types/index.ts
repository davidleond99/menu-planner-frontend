export interface IMessage {
  severity: 'success' | 'info' | 'warn' | 'error';
  summary: string;
  detail?: string;
  life?: number;
  show: boolean;
}

export interface IShowMessage extends Omit<IMessage, 'show'> {
  sticky?: boolean;
}
