import { NextPage } from 'next';
import Head from 'next/head';

const Login: NextPage = () => {
  return (
    <div className='bg-zwav-gray-200 min-h-[100vh]'>
      <Head>
        <title>login</title>
        <link rel='icon' href='/zwav_logo.svg' />
      </Head>
      <h1 className='text-white'>login page</h1>
    </div>
  );
};

export default Login;
