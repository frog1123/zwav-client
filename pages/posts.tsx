import type { NextPage } from 'next';

import { Navbar } from '../components/Navbar';
import { PostsList } from '../components/PostsList';

const Posts: NextPage = () => {
  return (
    <div className='bg-zinc-700 h-[100%]'>
      <Navbar />
      <div className='pt-[20px] pb-[50px] w-[80%] m-auto no-scrollbar'>
        <PostsList />
      </div>
    </div>
  );
};

export default Posts;
