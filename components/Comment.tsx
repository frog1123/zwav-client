import type { FC } from 'react';
import moment from 'moment';

interface Comment {
  comment: {
    author: string;
    content: string;
    createdAt: string;
  };
}

export const Comment: FC<Comment> = props => {
  return (
    <>
      <div className='grid grid-cols-2'>
        <h2 className='text-white font-medium'>{props.comment.author}</h2>
        <h2 className='flex justify-end text-white'>{moment(parseFloat(props.comment.createdAt)).fromNow()}</h2>
      </div>
      <h2 className='text-white'>{props.comment.content}</h2>
    </>
  );
};
