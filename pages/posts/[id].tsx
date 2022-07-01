import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { gql } from '@apollo/client';
import client from '../../apollo-client';

import { Navbar } from '../../components/Navbar';

const Post: NextPage = ({ post }: any) => {
  return (
    <div className='bg-zwav-gray-200 min-h-[100vh]'>
      <Head>
        <title>{post.title} - zwav</title>
        <link rel='icon' href='/zwav_logo.svg' />
      </Head>
      <Navbar />
      <div className='pt-[80px]'>
        <h1 className='text-white'>u r on post {useRouter().query.id}</h1>
        <h2 className='text-white'>id: {post.id}</h2>
        <h2 className='text-white'>author: {post.author}</h2>
        <h2 className='text-white'>title: {post.title}</h2>
        <h2 className='text-white'>content: {post.content}</h2>
        <h2 className='text-white'>createdAt: {post.createdAt}</h2>
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
      }
    }
  `;

  const { data } = await client.query({ query, variables: { id: params.id } });
  return { props: { post: data.post } };
}

export default Post;
