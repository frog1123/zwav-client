import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import moment from 'moment';

import { Navbar } from '../../components/Navbar';
import { FriendsList } from '../../components/FriendsList';
import { CreateComment } from '../../components/CreateComment';
import { useContext } from 'react';
import { UserContext } from '../../UserContext';
import client from '../../apollo-client';

interface Post {
  author: string;
  title: string;
  content?: string;
  createdAt: string;
  comments?: Array<{ author: string; content: string; createdAt: string }>;
}

const Post: NextPage<{ post: Post }> = ({ post }) => {
  const query = gql`
    query post($id: ID!) {
      post(id: $id) {
        id
        author
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

  const { value, setValue } = useContext(UserContext);
  const { error, loading, data, refetch } = useQuery(query, { variables: { id: useRouter().query.id } });

  if (value.reloadCommentsList) {
    refetch();
    setValue({ reloadCommentsList: false });
  }

  if (loading) return <h1>loading</h1>;
  if (error) return <h1>error</h1>;

  return (
    <div className='bg-zwav-gray-200 min-h-[100vh]'>
      <Head>
        <title>{post.title} - zwav</title>
        <link rel='icon' href='/zwav_logo.svg' />
      </Head>
      <Navbar />
      <div className='grid grid-cols-[12%_80%] pt-[80px] pb-[50px]'>
        <div className='mr-[6px] ml-[6px]'>
          <FriendsList />
        </div>
        <div className='bg-zwav-gray-300 rounded-[8px] p-[4px]'>
          <div className='grid grid-cols-2'>
            <h2 className='text-white'>posted by {data.post.author}</h2>
            <h2 className='flex justify-end text-white'>{moment(parseFloat(data.post.createdAt)).fromNow()}</h2>
          </div>
          <h2 className='text-white font-medium break-words'>{post.title}</h2>
          <h2 className='text-white break-words'>{data.post.content}</h2>
          <div className='bg-zwav-gray-100 h-[2px] w-[100%] rounded-[1px]'></div>
          <CreateComment postId={useRouter().query.id.toString()} />
          {data.post.comments.map((comment: any, index: number) => (
            <div key={index}>
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

export const getServerSideProps = async ({ params }: any) => {
  const query = gql`
    query post($id: ID!) {
      post(id: $id) {
        title
      }
    }
  `;

  const { data } = await client.query({ query, variables: { id: params.id } });
  return { props: { post: data.post } };
};

export default Post;
