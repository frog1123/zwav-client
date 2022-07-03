import type { FC } from 'react';
import { useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import { UserContext } from '../UserContext';

import { Post } from './Post';

export const PostsList: FC = () => {
  const query = gql`
    query posts {
      posts {
        id
        author
        title
        content
        createdAt
      }
    }
  `;

  const { value, setValue } = useContext(UserContext);
  const { error, loading, data, refetch } = useQuery(query);

  if (value.reloadPostsList) {
    refetch().then(() => setValue({ reloadPostsList: false }));
  }

  if (loading) return <h1>loading</h1>;
  if (error) return <h1>error</h1>;

  return (
    <>
      <div className='grid grid-cols-1 gap-y-[6px] m-auto overflow-y-scroll no-scrollbar'>
        {data.posts.map(({ id, author, title, content, createdAt }: { id: string; author: string; title: string; content: string; createdAt: string }, index: number) => (
          <Post id={id} author={author} title={title} content={content} createdAt={createdAt} key={index} />
        ))}
      </div>
    </>
  );
};
