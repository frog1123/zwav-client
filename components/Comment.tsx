import type { FC } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
          <a className='text-gray-400 text-sm hover:text-white w-[max-content]'>{props.comment.author.username}</a>
        </Link>
        <h2 className='flex justify-end text-gray-400 text-sm'>{moment(parseFloat(props.comment.createdAt)).fromNow()}</h2>
      </div>
      <h2 className='text-white whitespace-pre-line'>{props.comment.content}</h2>
    </>
  );
};
