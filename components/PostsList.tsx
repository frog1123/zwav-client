import type { FC } from 'react';

import { Post } from './Post';

export const PostsList: FC = () => {
  const posts = [
    { title: 'title1', content: 'content1' },
    { title: 'title2', content: 'content2' },
    { title: 'title3', content: 'content3' },
    { title: 'title1', content: 'content1' },
    { title: 'title2', content: 'content2' },
    { title: 'title3', content: 'content3' },
    { title: 'title1', content: 'content1' },
    { title: 'title2', content: 'content2' },
    { title: 'title3', content: 'content3' },
    { title: 'title1', content: 'content1' },
    { title: 'title2', content: 'content2' },
    { title: 'title3', content: 'content3' },
    { title: 'title1', content: 'content1' },
    { title: 'title2', content: 'content2' },
    { title: 'title3', content: 'content3' },
    { title: 'title1', content: 'content1' },
    { title: 'title2', content: 'content2' },
    { title: 'title3', content: 'content3' },
    { title: 'title1', content: 'very long post very long post very long post very long post very long post very long post very long post very long post very long post very long post very long post very long post very long post very long post very long post very long post very long post very long post very long post very long post very long post very long post very long post very long post very long post very long post' }
  ];

  return (
    <>
      <div className='m-auto overflow-y-scroll no-scrollbar'>
        {posts.map(({ title, content }, index) => (
          <Post title={title} content={content} key={index} />
        ))}
      </div>
    </>
  );
};
