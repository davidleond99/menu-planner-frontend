import { faCheck, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Alert, Label } from "flowbite-react";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { appSelector, hideMsg } from "../../redux/message";
import { useAppDispatch } from "../../store";
import { Icon } from "../Icon";


export interface IMessageProps {
  show?: boolean;
}

export const Message: FC<IMessageProps> = ({ show }) => {
  const { typeMsg, message } = useSelector(appSelector);
  const hide = () => {
    setTimeout(() => {
      dispatch(hideMsg());
    }, 2000);
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (show) hide();
  }, [show]);

  return (
    <div
      aria-hidden="false"
      data-testid="modal"
      role="dialog"
      className={`fixed top-0 right-10 z-50 flex h-20 w-96 transform items-start justify-end self-end overflow-y-auto overflow-x-hidden opacity-0 transition-all duration-300 ease-in-out ${
        show
          ? 'translate-y-10 opacity-100'
          : 'translate-y-negative-full opacity-0'
      }`}
    >
      <Alert
        icon={() => (
          <Icon icon={typeMsg === 'success' ? faCheck : faInfoCircle} />
        )}
        color={typeMsg}
        className={`shadow-md ${show ? 'flex' : 'hidden'}`}
      >
        <Label className="ml-2">{message}</Label>
      </Alert>
    </div>
  );
};
