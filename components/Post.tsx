import type { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import moment from 'moment';
import { useQuery, gql } from '@apollo/client';

export const Post: FC<{ id: string; author: string; title: string; content?: string; createdAt: string }> = props => {
  const query = gql`
    query ($id: ID!) {
      user(id: $id) {
        username
      }
    }
  `;

  const { data } = useQuery(query, { variables: { id: props.author } });

  return (
    <div className='bg-zwav-gray-300 rounded-[8px] p-[10px] break-words'>
      <div className='grid grid-cols-2'>
        <Link href={`${useRouter().basePath}/users/${props.author}`}>
          <h2 className='text-gray-400 w-[max-content] hover:text-white text-sm cursor-pointer'>{typeof data?.user?.username !== 'undefined' ? data.user.username : 'unknown'}</h2>
        </Link>
        <h2 className='w-[max-content] flex ml-[auto] text-gray-400 text-sm'>{moment(parseFloat(props.createdAt)).fromNow()}</h2>
      </div>
      <Link href={`${useRouter().basePath}/posts/${props.id}`}>
        <h1 className='text-white font-medium cursor-pointer w-[max-content]'>{props.title}</h1>
      </Link>
      <h1 className='text-white'>{props.content}</h1>
    </div>
  );
};
