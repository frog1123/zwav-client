import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../public/zwav_logo.svg';

export const Navbar: FC = () => {
  return (
    <div className='fixed bg-zwav-gray-400 grid grid-cols-[max-content_auto_max-content] h-[50px] w-[100%]'>
      <Link href='/posts'>
        <a className='grid grid-cols-2 place-items-center h-[100%]'>
          <div className='select-none m-[auto] h-[25px]'>
            <Image src={logo} height={25} width={25} />
          </div>
          <h1 className='text-white'>zwav</h1>
        </a>
      </Link>
      <h1 className='self-center flex justify-center text-white'>add search bar</h1>
      <div className='grid grid-cols-2 gap-x-[10px] pr-[20px] place-items-center w-[100%]'>
        <Link href='/'>
          <a className='text-white'>home</a>
        </Link>
        <Link href='/posts'>
          <a className='text-white'>posts</a>
        </Link>
      </div>
    </div>
  );
};
