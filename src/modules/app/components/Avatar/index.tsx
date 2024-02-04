import { FC } from 'react';

export interface IAvatarProps {
  status?: string;
}

export const Avatar: FC<IAvatarProps> = (props) => {
  return (
    <div className="relative">
      <div className="relative h-12 w-12 rounded-full bg-cover lg:mb-0">
        <img
          src="https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_2.png"
          alt="avatar"
          className="h-full w-full overflow-hidden rounded-full shadow"
        />
        {
          <div
            className={`absolute right-1.5 bottom-0 z-10 h-5 w-5 rounded-full border-2 border-white ${
              props.status === 'Draft' && 'bg-gray-500'
            } ${props.status === 'Online' && 'bg-green-500'} ${
              props.status === 'Offline' && 'bg-red-500'
            }`}
          />
        }
      </div>
    </div>
  );
};
