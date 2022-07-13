import { FC, useContext, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { UserContext } from '../UserContext';

import { Post } from '@components/Post';

export const PostsList: FC = () => {
  const query = gql`
    query ($user: ID!, $limit: Int!, $offset: Int!) {
      posts(user: $user, limit: $limit, offset: $offset) {
        id
        author {
          id
          username
        }
        title
        content
        createdAt
      }
    }
  `;

  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);
  const { value, setValue } = useContext(UserContext);
  const { error, loading, data, refetch, fetchMore } = useQuery(query, { variables: { user: 'any', limit: limit, offset: 0 }, fetchPolicy: 'cache-and-network' });

  const fetchMorePosts = () => {
    return fetchMore({
      variables: {
        limit: limit,
        offset: offset + limit
      },
      updateQuery: (prev, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) return prev;
        if (fetchMoreResult.posts.length !== 0) setOffset(offset + limit);
        return Object.assign({}, prev, {
          posts: [...prev.posts, ...fetchMoreResult.posts]
        });
      }
    });
  };

  if (value.reloadPostsList) refetch().then(() => setValue({ reloadPostsList: false }));
  if (value.fetchMorePostsList) fetchMorePosts().then(() => setValue({ fetchMorePostsList: false }));

  if (loading)
    return (
      <div className='bg-zwav-gray-300 p-[6px] flex justify-center rounded-[8px]'>
        <h1 className='text-white'>loading...</h1>
      </div>
    );
  if (error)
    return (
      <div className='bg-zwav-gray-300 p-[6px] flex justify-center rounded-[8px]'>
        <h1 className='text-white'>something went wrong :/</h1>
      </div>
    );

  return (
    <div className='grid grid-cols-1 gap-y-[6px] m-auto overflow-y-scroll no-scrollbar'>
      {data.posts.map(({ id, author, title, content, createdAt }: { id: string; author: string; title: string; content: string; createdAt: string }, index: number) => (
        <Post id={id} author={author} title={title} content={content} createdAt={createdAt} key={index} />
      ))}
    </div>
  );
};
