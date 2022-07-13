import type { NextPage } from 'next';
import Head from 'next/head';

import { Navbar } from '@components/Navbar';
import { CreatePost } from '@components/CreatePost';
import { PostsList } from '@components/PostsList';
import { FriendsList } from '@components/FriendsList';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from 'UserContext';

const Posts: NextPage = () => {
  const [loadCreatePost, setLoadCreatePost] = useState(false);
  const { value, setValue } = useContext(UserContext);

  useEffect(() => setLoadCreatePost(true));

  if (typeof window !== 'undefined') {
    window.onscroll = () => {
      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
      if (bottom && value.fetchMorePostsList === false) setValue({ fetchMorePostsList: true });
    };
  }

  return (
    <>
      <Head>
        <title>zwav</title>
        <meta name='title' content='zwav' />
        <meta name='description' content='register and stuff it will be cool' />
        <meta name='og:title' content='zwav' />
        <meta name='og:description' content='register and stuff it will be cool' />
      </Head>
      <Navbar />
      <div className='grid grid-cols-[12%_80%] pt-[80px]'>
        <div className='mr-[6px] ml-[6px]'>
          <FriendsList />
        </div>
        <div className='grid grid-rows-[max-content_max_content_max-content] pb-[50px]'>
          {loadCreatePost ? <CreatePost /> : ''}
          <div className='mt-[15px] w-[100%] m-auto'>
            <PostsList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
