import { FC, useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import { UserContext } from '../UserContext';
import Cookie from 'js-cookie';

import TextareaAutosize from 'react-textarea-autosize';
import Link from 'next/link';

export const CreatePost: FC = () => {
  let title: string | undefined, content: string | undefined;

  const getPostInput = (): { title: string; content: string } => {
    if (typeof window !== 'undefined') {
      title = (document.getElementById('title') as HTMLInputElement)?.value;
      content = (document.getElementById('content') as HTMLInputElement)?.value;

      return { title, content };
    }
  };

  const mutation = gql`
    mutation createPost($author: ID!, $title: String!, $content: String, $createdAt: String!) {
      createPost(author: $author, title: $title, content: $content, createdAt: $createdAt)
    }
  `;

  const { setValue } = useContext(UserContext);
  const [_submitPost] = useMutation(mutation);

  const submitPost = () => {
    if (getPostInput().title.length !== 0) {
      _submitPost({ variables: { author: Cookie.get('currentUserId'), title: getPostInput()?.title, content: getPostInput()?.content, createdAt: new Date().getTime().toString() } }).then(() => setValue({ reloadPostsList: true }));

      if (typeof window !== 'undefined') {
        (document.getElementById('title') as HTMLInputElement).value = '';
        (document.getElementById('content') as HTMLInputElement).value = '';
      }
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.which == '13') e.preventDefault();
    if (e.key === 'Enter') submitPost();
  };

  if (typeof Cookie.get('currentUserId') === 'undefined')
    return (
      <>
        <div className='flex justify-center bg-zwav-gray-300 p-[8px] rounded-[8px] gap-y-[6px]'>
          <h1 className='text-white'>
            <Link href='/login'>
              <a className='text-zwav-color hover:text-zwav-color-hover'>login</a>
            </Link>{' '}
            or{' '}
            <Link href='/register'>
              <a className='text-zwav-color hover:text-zwav-color-hover'>reigster</a>
            </Link>{' '}
            to create posts
          </h1>
        </div>
      </>
    );

  if (Cookie.get('currentUserId'))
    return (
      <>
        <div className='grid grid-rows-[max-content_max-content] bg-zwav-gray-300 p-[8px] rounded-[8px] gap-y-[6px]'>
          <TextareaAutosize id='title' onKeyPress={e => handleKeyPress(e)} placeholder='title (required)' className='bg-zwav-gray-400 rounded-[6px] pl-[4px] pr-[2px] outline-none overflow-x-hidden text-white no-scrollbar resize-none' />
          <TextareaAutosize id='content' minRows={3} placeholder='content' className='bg-zwav-gray-400 rounded-[6px] pl-[4px] pr-[2px] outline-none text-white no-scrollbar resize-none' />
          <button onClick={() => submitPost()} className='w-[80px] rounded-[8px] transition ease-in-out border-none bg-zwav-color hover:bg-zwav-color-hover duration-[0.25s]'>
            <h2 className='text-white'>post</h2>
          </button>
        </div>
      </>
    );
};
