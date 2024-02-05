import { FC, ReactElement } from 'react';
import { NavLink as DomNavLink } from 'react-router-dom';
import { INavLink } from '../../../../shared/interfaces';

export const NavLink: FC<INavLink> = ({
  end,
  to,
  label,
  labelStyle,
  className,
}): ReactElement => {
  return (
    <DomNavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `${
          isActive &&
          'border-r-4 border-blue-500 bg-gradient-to-r from-white to-blue-100'
        } my-2 flex w-full items-center justify-start p-4 font-thin uppercase text-blue-500 transition-colors duration-200 ${className}`
      }
    >
      <span className={`mx-4 text-sm font-normal ${labelStyle}`}>{label}</span>
    </DomNavLink>
  );
};
