import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

export const UserPost: FC<{ id: string; title: string; content: string; createdAt: string }> = props => {
  return (
    <div className='bg-zwav-gray-400 rounded-[8px] m-[6px] p-[10px] break-words'>
      <div className='grid grid-cols-2'>
        <Link href={`${useRouter().basePath}/posts/${props.id}`}>
          <h1 className='text-white font-medium cursor-pointer w-[max-content]'>{props.title}</h1>
        </Link>
        <h2 className='w-[max-content] flex ml-[auto] text-gray-400 text-sm'>{moment(parseFloat(props.createdAt)).fromNow()}</h2>
      </div>
      <h1 className='text-white'>{props.content}</h1>
    </div>
  );
};
