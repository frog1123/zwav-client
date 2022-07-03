import type { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import moment from 'moment';

export const Post: FC<{ id: string; author: string; title: string; content?: string; createdAt: string }> = props => {
  return (
    <div className='bg-zwav-gray-300 rounded-[8px] p-[10px] break-words'>
      <div className='grid grid-cols-2'>
        <h2 className='text-white text-sm'>{props.author}</h2>
        <h2 className='flex justify-end text-white text-sm'>{moment(parseFloat(props.createdAt)).fromNow()}</h2>
      </div>
      <Link href={`${useRouter().basePath}/posts/${props.id}`}>
        <h1 className='text-white font-medium cursor-pointer'>{props.title}</h1>
      </Link>
      <h1 className='text-white'>{props.content}</h1>
    </div>
  );
};
