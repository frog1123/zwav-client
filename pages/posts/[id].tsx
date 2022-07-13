import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';

import { Navbar } from '@components/Navbar';
import { FriendsList } from '@components/FriendsList';
import { CreateComment } from '@components/CreateComment';
import { CommentsList } from '@components/CommentsList';

import { UserContext } from '../../UserContext';
import client from '../../apollo-client';
import Link from 'next/link';

interface Post {
  author: {
    id: string;
    username: string;
  };
  title: string;
  content?: string;
  createdAt: string;
}

const Post: NextPage<{ post: Post }> = ({ post }) => {
  const { value, setValue } = useContext(UserContext);
  if (typeof window !== 'undefined') {
    window.onscroll = () => {
      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
      if (bottom && value.fetchMoreCommentsList === false) setValue({ fetchMoreCommentsList: true });
    };
  }

  const [postId] = useState(useRouter().query.id.toString());
  const [loadCreateComment, setLoadCreateComment] = useState(false);

  useEffect(() => setLoadCreateComment(true), []);

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name='title' content={post.title} />
        <meta name='description' content={post.content !== '' ? `posted by ${post.author.username}: ${post.content}` : `posted by ${post.author.username}: no description`} />
        <meta name='og:title' content={post.title} />
        <meta name='og:description' content={post.content !== '' ? `posted by ${post.author.username}: ${post.content}` : `posted by ${post.author.username}: no description`} />
      </Head>
      <Navbar />
      <div className='grid grid-cols-[12%_80%] pt-[80px] pb-[50px]'>
        <div className='mr-[6px] ml-[6px]'>
          <FriendsList />
        </div>
        <div>
          <div className='bg-zwav-gray-300 rounded-[8px] p-[4px]'>
            <div>
              <div className='grid grid-cols-2'>
                <h2 className='text-white'>
                  posted by{' '}
                  <Link href={`${useRouter().basePath}/users/${post.author.id}`}>
                    <a className='font-medium'>{post.author.username}</a>
                  </Link>
                </h2>
                <h2 className='flex justify-end text-gray-400 text-sm'>{moment(parseFloat(post.createdAt)).fromNow()}</h2>
              </div>
              <h2 className='text-white font-medium break-words'>{post.title}</h2>
              <h2 className='text-white break-words'>{post.content}</h2>
              <div className='bg-zwav-gray-100 h-[2px] w-[100%] rounded-[1px]'></div>
              {loadCreateComment ? <CreateComment postId={postId} /> : ''}
              <CommentsList />
            </div>
          </div>
          <div className='flex justify-center mt-[10px]'>
            <button onClick={() => setValue({ fetchMoreCommentsList: true })} className='p-[4px] rounded-[8px] transition ease-in-out border-none bg-zwav-color hover:bg-zwav-color-hover duration-[0.25s]'>
              <h1 className='text-white'>load more comments</h1>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ params }: any) => {
  const query = gql`
    query ($id: ID!) {
      post(id: $id, commentsLimit: 0, commentsOffset: 0) {
        title
        content
        author {
          id
          username
        }
        createdAt
      }
    }
  `;

  const { data } = await client.query({ query, variables: { id: params.id } });
  return { props: { post: data.post } };
};

export default Post;
