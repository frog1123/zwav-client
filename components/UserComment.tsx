import { parseTwemoji } from '@utils/parseTwemoji';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

export const UserComment: FC<{ id: string; content: string; replyingTo: any; createdAt: string }> = props => {
  return (
    <div className='bg-zwav-gray-400 rounded-[8px] m-[6px] p-[10px] break-words'>
      <div className='grid grid-cols-2'>
        <h1 className='text-white'>
          replying to{' '}
          <Link href={`${useRouter().basePath}/posts/${props.replyingTo.id}`}>
            <a className='text-white font-medium'>{parseTwemoji(props.replyingTo.author.username)}</a>
          </Link>
        </h1>
        <h2 className='flex justify-end text-gray-400 text-sm'>{moment(parseFloat(props.createdAt)).fromNow()}</h2>
      </div>
      <h2 className='text-white whitespace-pre-line'>{parseTwemoji(props.content)}</h2>
    </div>
  );
};
