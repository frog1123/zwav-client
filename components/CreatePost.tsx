import type { FC } from 'react';
import { gql, useMutation } from '@apollo/client';

export const CreatePost: FC = () => {
  let title: string | undefined, content: string | undefined;

  const getPostInput = () => {
    if (typeof window !== 'undefined') {
      title = document.getElementById('title')?.innerHTML;
      content = document.getElementById('content')?.innerHTML;

      return { title, content };
    }
  };

  const mutation = gql`
    mutation createPost($author: ID!, $title: String!, $content: String, $createdAt: String!) {
      createPost(author: $author, title: $title, content: $content, createdAt: $createdAt) {
        author
        title
        content
        createdAt
      }
    }
  `;

  const [submitPost] = useMutation(mutation);

  return (
    <>
      <div className='grid grid-rows-[max-content_max-content] bg-zwav-gray-300 p-[8px] rounded-[8px] gap-y-[6px]'>
        <div id='title' placeholder='title' contentEditable='true' className='bg-zwav-gray-400 rounded-[6px] pl-[4px] outline-none text-white break-words overflow-y-auto'></div>
        <div id='content' placeholder='content' contentEditable='true' className='bg-zwav-gray-400 rounded-[6px] pl-[4px] outline-none text-white break-words overflow-y-auto p-[0_0_80px_0]'></div>
        <button onClick={() => submitPost({ variables: { author: 'unknown', title: getPostInput()?.title, content: getPostInput()?.content, createdAt: new Date().getTime().toString() } })} className='w-[80px] rounded-[8px] transition ease-in-out bg-zwav-purple hover:bg-zwav-red duration-300'>
          <h2 className='text-white'>post</h2>
        </button>
      </div>
    </>
  );
};
