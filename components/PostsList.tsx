import type { FC } from 'react';
import { gql, useQuery } from '@apollo/client';

import { Post } from './Post';

export const PostsList: FC = () => {
  const query = gql`
    query posts {
      posts {
        author
        title
        content
        createdAt
      }
    }
  `;

  const { error, loading, data } = useQuery(query);

  if (loading) return <h1>loading</h1>;
  if (error) return <h1>error</h1>;

  return (
    <>
      <div className='m-auto overflow-y-scroll no-scrollbar'>
        {data.posts.map(({ author, title, content, createdAt }: { author: string; title: string; content: string; createdAt: string }, index: number) => (
          <Post author={author} title={title} content={content} createdAt={createdAt} key={index} />
        ))}
      </div>
    </>
  );
};
