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
import Link from 'next/link';

interface Post {
  author: {
    id: string;
    username: string;
  };
  title: string;
  content?: string;
  createdAt: string;
  comments?: Array<{ author: string; content: string; createdAt: string }>;
}

interface Author {
  username: string;
}

const Post: NextPage<{ post: Post; author: Author }> = ({ post, author }) => {
  const query = gql`
    query ($id: ID!, $commentsLimit: Int!, $commentsOffset: Int!) {
      post(id: $id, commentsLimit: $commentsLimit, commentsOffset: $commentsOffset) {
        author {
          id
          username
        }
        content
        createdAt
        comments {
          author {
            id
            username
          }
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
  const { error, loading, data, refetch, fetchMore } = useQuery(query, { variables: { id: useRouter().query.id, commentsLimit: limit, commentsOffset: 0 }, fetchPolicy: 'cache-and-network' });

  if (value.reloadCommentsList) refetch().then(() => setValue({ reloadCommentsList: false }));

  const fetchMoreComments = () => {
    fetchMore({
      variables: {
        commentsLimit: limit,
        commentsOffset: offset + limit
      },
      updateQuery: (prev, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) return prev;
        if (fetchMoreResult.post.comments.length !== 0) setOffset(offset + 10);
        return Object.assign({}, prev, {
          post: Object.assign({}, prev.post, {
            comments: [...prev.post.comments, ...fetchMoreResult.post.comments]
          })
        });
      }
    });
  };

  if (error) return <h1 className='text-white'>something went wrong :/</h1>;

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
            {loading ? (
              <h1 className='text-white'>loading...</h1>
            ) : error ? (
              <h1 className='text-white'>something went wrong :/</h1>
            ) : (
              <div>
                <div className='grid grid-cols-2'>
                  <h2 className='text-white'>
                    posted by{' '}
                    <Link href={`${useRouter().basePath}/users/${post.author.id}`}>
                      <a className='font-medium'>{post.author.username}</a>
                    </Link>
                  </h2>
                  <h2 className='flex justify-end text-gray-400 text-sm'>{moment(parseFloat(data.post.createdAt)).fromNow()}</h2>
                </div>
                <h2 className='text-white font-medium break-words'>{post.title}</h2>
                <h2 className='text-white break-words'>{data.post.content}</h2>
                <div className='bg-zwav-gray-100 h-[2px] w-[100%] rounded-[1px]'></div>
                <CreateComment postId={postId} />
                {data.post.comments.length > 0 ? <div className='bg-zwav-gray-100 h-[2px] w-[100%] mt-[4px] rounded-[1px]'></div> : ''}
                <div className='pl-[4px] pr-[4px]'>
                  {data.post.comments.map((comment: any, index: number) => (
                    <Comment comment={comment} key={index} />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className='flex justify-center mt-[10px]'>
            <button onClick={() => fetchMoreComments()} className='p-[4px] rounded-[8px] transition ease-in-out border-none bg-zwav-color hover:bg-zwav-color-hover duration-[0.25s]'>
              <h1 className='text-white'>Fetch more comments</h1>
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
      }
    }
  `;

  const { data } = await client.query({ query, variables: { id: params.id } });

  return { props: { post: data.post } };
};

export default Post;
