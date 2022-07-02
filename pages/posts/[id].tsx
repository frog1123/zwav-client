import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { gql } from '@apollo/client';
import client from '../../apollo-client';
import moment from 'moment';

import { Navbar } from '../../components/Navbar';
import { FriendsList } from '../../components/FriendsList';

interface Post {
  author: string;
  title: string;
  content?: string;
  createdAt: string;
  comments?: Array<{ author: string; content: string; createdAt: string }>;
}

const Post: NextPage<{ post: Post }> = ({ post }) => {
  console.log(post);

  return (
    <div className='bg-zwav-gray-200 min-h-[100vh]'>
      <Head>
        <title>{post.title} - zwav</title>
        <link rel='icon' href='/zwav_logo.svg' />
      </Head>
      <Navbar />
      <div className='grid grid-cols-[12%_80%] pt-[80px] '>
        <div className='mr-[6px] ml-[6px]'>
          <FriendsList />
        </div>
        <div className='bg-zwav-gray-300 rounded-[8px] p-[4px]'>
          <div className='grid grid-cols-2'>
            <h2 className='text-white'>posted by {post.author}</h2>
            <h2 className='flex justify-end text-white'>{moment(parseFloat(post.createdAt)).fromNow()}</h2>
          </div>
          <h2 className='text-white font-medium'>{post.title}</h2>
          <h2 className='text-white'>{post.content}</h2>
          <div className='bg-zwav-gray-100 h-[2px] w-[100%] rounded-[1px]'></div>

          {post.comments.map((comment: any) => (
            <div>
              <div className='grid grid-cols-2'>
                <h2 className='text-white font-medium'>{comment.author}</h2>
                <h2 className='flex justify-end text-white'>{moment(parseFloat(comment.createdAt)).fromNow()}</h2>
              </div>
              <h2 className='text-white'>{comment.content}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params }: any) {
  const query = gql`
    query post($id: ID!) {
      post(id: $id) {
        id
        author
        title
        content
        createdAt
        comments {
          author
          content
          createdAt
        }
      }
    }
  `;

  const { data } = await client.query({ query, variables: { id: params.id } });
  return { props: { post: data.post } };
}

export default Post;
