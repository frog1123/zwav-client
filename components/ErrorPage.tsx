import type { FC } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export const ErrorPage: FC<{ error: number; message: string }> = props => {
  return (
    <div className='bg-zwav-gray-200 h-[100vh] flex justify-center'>
      <Head>
        <title>zwav - {props.error}</title>
        <link rel='icon' href='/zwav_logo.svg' />
      </Head>
      <div className='grid place-items-center grid-rows-[max-content_max-content_max-content_max-content]'>
        <h1 className='text-zwav-color hover:text-zwav-color-hover duration-[0.25s] cursor-default text-[80px]'>{props.error}</h1>
        <div className='bg-zwav-gray-100 h-[2px] w-[100%] rounded-[1px]'></div>
        <h1 className='text-white'>{props.message}</h1>
        <h2 className='text-white'>
          return{' '}
          <Link href='/posts'>
            <span className='text-zwav-color hover:text-zwav-color-hover duration-[0.25s] cursor-pointer'>home</span>
          </Link>
        </h2>
      </div>
    </div>
  );
};
