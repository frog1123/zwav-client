import { NextPage } from 'next';
import Head from 'next/head';
import { gql } from '@apollo/client';
import client from '../../apollo-client';
import { Navbar } from '@components/Navbar';
import { UserPost } from '@components/UserPost';
import { UserComment } from '@components/UserComment';
import moment from 'moment';

const User: NextPage = ({ user, posts, comments }: any) => {
  const switchTabs = (tab: string) => {
    if (tab === 'posts') {
      document.getElementById('comments').classList.remove('block');
      document.getElementById('comments').classList.add('hidden');

      document.getElementById('posts').classList.remove('hidden');
      document.getElementById('posts').classList.add('block');

      document.getElementById('comment-text').classList.add('text-gray-400');
      document.getElementById('comment-text').classList.remove('text-white');

      document.getElementById('post-text').classList.remove('text-gray-400');
      document.getElementById('post-text').classList.add('text-white');
    }

    if (tab === 'comments') {
      document.getElementById('posts').classList.remove('block');
      document.getElementById('posts').classList.add('hidden');

      document.getElementById('comments').classList.remove('hidden');
      document.getElementById('comments').classList.add('block');

      document.getElementById('post-text').classList.add('text-gray-400');
      document.getElementById('post-text').classList.remove('text-white');

      document.getElementById('comment-text').classList.remove('text-gray-400');
      document.getElementById('comment-text').classList.add('text-white');
    }
  };

  return (
    <>
      <Navbar />
      <div className='pt-[80px] pb-[50px]'>
        <div className='flex justify-center bg-zwav-gray-300 w-[95%] ml-[auto] mr-[auto] rounded-[8px]'>
          <h2 className='text-white text-[40px]'>{user.username}</h2>
        </div>
        <div className='bg-zwav-gray-300 w-[95%] ml-[auto] mr-[auto] rounded-[8px] mt-[10px] p-[4px]'>
          <h2 className='text-white'>id {user.id}</h2>
          <h2 className='text-white'>joined {moment(parseFloat(user.createdAt)).fromNow()}</h2>
        </div>
        <div className='bg-zwav-gray-300 w-[95%] ml-[auto] mr-[auto] rounded-[8px] mt-[10px] p-[4px]'>
          <div className='grid grid-cols-2 place-items-center'>
            <h1 onClick={() => switchTabs('posts')} id='post-text' className='text-gray-400 hover:text-white text-[28px] cursor-pointer'>
              posts
            </h1>
            <h1 onClick={() => switchTabs('comments')} id='comment-text' className='text-gray-400 hover:text-white text-[28px] cursor-pointer'>
              comments
            </h1>
          </div>
          <div className='bg-zwav-gray-100 h-[2px] w-[100%] rounded-[1px]'></div>
          <div id='posts'>
            {posts.map(({ id, title, content, createdAt }: { id: string; title: string; content: string; createdAt: string }) => (
              <UserPost id={id} title={title} content={content} createdAt={createdAt} />
            ))}
          </div>
          <div id='comments' className='hidden'>
            {comments.map(({ content, createdAt }: { content: string; createdAt: string }) => (
              <UserComment content={content} createdAt={createdAt} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ params }: any) => {
  const userQuery = gql`
    query ($id: ID!) {
      user(id: $id) {
        id
        username
        createdAt
      }
    }
  `;

  const postsQuery = gql`
    query ($user: ID!, $limit: Int!, $offset: Int!) {
      posts(user: $user, limit: $limit, offset: $offset) {
        id
        title
        content
        createdAt
      }
    }
  `;

  const commentsQuery = gql`
    query ($user: ID!, $limit: Int!, $offset: Int!) {
      comments(user: $user, limit: $limit, offset: $offset) {
        content
        createdAt
      }
    }
  `;

  const userInfo = await client.query({ query: userQuery, variables: { id: params.id } });
  const postsInfo = await client.query({ query: postsQuery, variables: { user: params.id, limit: 10, offset: 0 } });
  const commentsInfo = await client.query({ query: commentsQuery, variables: { user: params.id, limit: 10, offset: 0 } });

  return { props: { user: userInfo.data.user, posts: postsInfo.data.posts, comments: commentsInfo.data.comments } };
};

export default User;
