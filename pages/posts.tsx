import type { NextPage } from 'next';
import Head from 'next/head';

import { Navbar } from '../components/Navbar';
import { CreatePost } from '../components/CreatePost';
import { PostsList } from '../components/PostsList';
import { FriendsList } from '../components/FriendsList';

const Posts: NextPage = () => {
  return (
    <div className='bg-zwav-gray-200 min-h-[100vh]'>
      <Head>
        <title>zwav - posts</title>
        <link rel='icon' href='/zwav_logo.svg' />
      </Head>
      <Navbar />
      <div className='grid grid-cols-[12%_80%] pt-[80px]'>
        <div className='mr-[6px] ml-[6px]'>
          <FriendsList />
        </div>
        <div className='grid grid-rows-[max-content_max_content]'>
          <CreatePost />
          <div className='mt-[15px] pb-[50px] w-[100%] m-auto no-scrollbar'>
            <PostsList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
