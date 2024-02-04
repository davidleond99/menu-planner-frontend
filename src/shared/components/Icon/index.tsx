
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

export interface IIconProps extends FontAwesomeIconProps {
  icon: IconProp;
}

export const Icon: FC<IIconProps> = (props) => {
  return <FontAwesomeIcon {...props} />;
};
