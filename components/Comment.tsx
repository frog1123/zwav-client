import type { FC } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseTwemoji } from '@utils/parseTwemoji';

interface Comment {
  comment: {
    author: {
      id: string;
      username: string;
    };
    content: string;
    createdAt: string;
  };
}

export const Comment: FC<Comment> = props => {
  return (
    <>
      <div className='grid grid-cols-2'>
        <Link href={`${useRouter().basePath}/users/${props.comment.author.id}`}>
          <a className='text-gray-400 text-sm hover:text-white w-[max-content]'>{parseTwemoji(props.comment.author.username, 'pointer')}</a>
        </Link>
        <h2 className='flex justify-end text-gray-400 text-sm'>{moment(parseFloat(props.comment.createdAt)).fromNow()}</h2>
      </div>
      <h2 className='text-white cursor-text whitespace-pre-line'>{parseTwemoji(props.comment.content, 'text')}</h2>
    </>
  );
};
