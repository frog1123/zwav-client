import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

export const UserComment: FC<{ content: string; replyingTo: string; createdAt: string }> = props => {
  return (
    <div className='bg-zwav-gray-400 rounded-[8px] m-[6px] p-[10px] break-words'>
      <div className='grid grid-cols-2'>
        <h1 className='text-white'>
          replying to{' '}
          <Link href={`${useRouter().basePath}/posts/${props.replyingTo}`}>
            <a className='text-zwav-color hover:text-zwav-color-hover cursor-pointer'>{props.replyingTo}</a>
          </Link>
        </h1>
        <h2 className='flex justify-end text-gray-400 text-sm'>{moment(parseFloat(props.createdAt)).fromNow()}</h2>
      </div>
      <h2 className='text-white'>{props.content}</h2>
    </div>
  );
};
