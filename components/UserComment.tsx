import moment from 'moment';
import { FC } from 'react';

export const UserComment: FC<{ content: string; createdAt: string }> = props => {
  return (
    <div className='bg-zwav-gray-400 rounded-[8px] m-[6px] p-[10px] break-words'>
      <div className='grid grid-cols-2'>
        <h1 className='text-white cursor-pointer'>replying to ...</h1>
        <h2 className='flex justify-end text-gray-400 text-sm'>{moment(parseFloat(props.createdAt)).fromNow()}</h2>
      </div>
      <h2 className='text-white'>{props.content}</h2>
    </div>
  );
};
