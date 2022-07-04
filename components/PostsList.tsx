import { FC, useContext, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { UserContext } from '../UserContext';

import { Post } from '@components/Post';

export const PostsList: FC = () => {
  const query = gql`
    query ($limit: Int!, $offset: Int!) {
      posts(limit: $limit, offset: $offset) {
        id
        author
        title
        content
        createdAt
      }
    }
  `;

  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);
  const { value, setValue } = useContext(UserContext);
  const { error, loading, data, refetch, fetchMore } = useQuery(query, { variables: { limit: limit, offset: 0 }, fetchPolicy: 'cache-and-network' });

  const fetchMorePosts = () => {
    fetchMore({
      variables: {
        limit: limit,
        offset: offset + limit
      },
      updateQuery: (prev, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) return prev;
        if (fetchMoreResult.posts.length !== 0) setOffset(offset + 10);
        return Object.assign({}, prev, {
          posts: [...prev.posts, ...fetchMoreResult.posts]
        });
      }
    });
  };

  if (value.reloadPostsList) refetch().then(() => setValue({ reloadPostsList: false }));

  if (loading) return <h1>loading</h1>;
  if (error) return <h1>error</h1>;

  return (
    <>
      <div className='grid grid-cols-1 gap-y-[6px] m-auto overflow-y-scroll no-scrollbar'>
        {data.posts.map(({ id, author, title, content, createdAt }: { id: string; author: string; title: string; content: string; createdAt: string }, index: number) => (
          <Post id={id} author={author} title={title} content={content} createdAt={createdAt} key={index} />
        ))}
      </div>
      <div className='flex justify-center pt-[20px]'>
        <button onClick={() => fetchMorePosts()} className='p-[4px] rounded-[8px] transition ease-in-out border-none bg-zwav-color hover:bg-zwav-color-hover duration-[0.25s]'>
          <h1 className='text-white'>Fetch more posts</h1>
        </button>
      </div>
    </>
  );
};
