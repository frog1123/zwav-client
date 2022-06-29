import type { FC } from 'react';
import { gql, useQuery } from '@apollo/client';

import { Post } from './Post';

export const PostsList: FC = () => {
  const query = gql`
    query posts {
      posts {
        title
        content
      }
    }
  `;

  const { error, loading, data } = useQuery(query);

  if (loading) return <h1>loading</h1>;
  if (error) return <h1>error</h1>;

  return (
    <>
      <div className='m-auto overflow-y-scroll no-scrollbar'>
        {data.posts.map(({ title, content }: { title: string; content: string }, index: number) => (
          <Post title={title} content={content} key={index} />
        ))}
      </div>
    </>
  );
};
