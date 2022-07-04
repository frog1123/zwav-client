import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import moment from 'moment';
import { useContext, useState } from 'react';

import { Navbar } from '@components/Navbar';
import { FriendsList } from '@components/FriendsList';
import { CreateComment } from '@components/CreateComment';
import { Comment } from '@components/Comment';

import { UserContext } from '../../UserContext';
import client from '../../apollo-client';

interface Post {
  post: {
    author: string;
    title: string;
    content?: string;
    createdAt: string;
    comments?: Array<{ author: string; content: string; createdAt: string }>;
  };
}

const Post: NextPage<Post> = ({ post }) => {
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

  const [postId] = useState(useRouter().query.id.toString());

  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);
  const { value, setValue } = useContext(UserContext);
  const { error, loading, data, refetch, fetchMore } = useQuery(query, { variables: { id: useRouter().query.id } });

  const fetchMoreComments = () => {
    fetchMore({
      variables: {
        limit: limit,
        offset: offset + limit
      },
      updateQuery: (prev, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) return prev;
        if (fetchMoreResult.posts.length !== 0) setOffset(offset + 10);
        return Object.assign({}, prev, {
          posts: [...prev.posts, ...fetchMoreResult.posts]
        });
      }
    });
  };

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
          <CreateComment postId={postId} />
          {data.post.comments.map((comment: any, index: number) => (
            <Comment comment={comment} key={index} />
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
