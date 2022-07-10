import { NextPage } from 'next';
import Head from 'next/head';
import { gql } from '@apollo/client';
import client from '../../apollo-client';

const User: NextPage = ({ user, posts }: any) => {
  return (
    <>
      <h1 className='text-white'>user page</h1>
      <h2 className='text-white'>username: {user.username}</h2>
      <h2 className='text-white'>id: {user.id}</h2>
      <h2 className='text-white'>createdAt: {user.createdAt}</h2>
      <h2 className='text-white'>recent posts: {JSON.stringify(posts)}</h2>
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

  const userInfo = await client.query({ query: userQuery, variables: { id: params.id } });
  const postsInfo = await client.query({ query: postsQuery, variables: { user: params.id, limit: 10, offset: 0 } });

  return { props: { user: userInfo.data.user, posts: postsInfo.data.posts } };
};

export default User;
