import type { NextPage } from 'next';

import { Navbar } from '../components/Navbar';
import { PostsList } from '../components/PostsList';
import { FriendsList } from '../components/FriendsList';

const Posts: NextPage = () => {
  return (
    <div className='bg-zwav-gray-200 h-[100%]'>
      <Navbar />
      <div className='grid grid-cols-[12%_80%] pt-[80px]'>
        <div className='mr-[6px] ml-[6px]'>
          <FriendsList />
        </div>
        <div className='pb-[50px] w-[100%] m-auto no-scrollbar'>
          <PostsList />
        </div>
      </div>
    </div>
  );
};

export default Posts;
