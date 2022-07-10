import type { FC } from 'react';
import moment from 'moment';
import { useQuery, gql } from '@apollo/client';

interface Comment {
  comment: {
    author: string;
    content: string;
    createdAt: string;
  };
}

export const Comment: FC<Comment> = props => {
  const query = gql`
    query ($id: ID!) {
      user(id: $id) {
        username
      }
    }
  `;

  const { data } = useQuery(query, { variables: { id: props.comment.author } });

  return (
    <>
      <div className='grid grid-cols-2'>
        <h2 className='text-white font-medium'>{data ? data.user.username : props.comment.author}</h2>
        <h2 className='flex justify-end text-gray-400 text-sm'>{moment(parseFloat(props.comment.createdAt)).fromNow()}</h2>
      </div>
      <h2 className='text-white'>{props.comment.content}</h2>
    </>
  );
};
