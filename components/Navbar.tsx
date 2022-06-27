import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../public/zwav_logo.svg';

export const Navbar: FC = () => {
  return (
    <div className='sticky bg-zinc-900 grid grid-cols-3 h-[50px] place-items-center'>
      <Link href='/'>
        <a className='grid grid-cols-2'>
          <div className='select-none'>
            <Image src={logo} height='25px' width='25px' />
          </div>
          <h1 className='text-white'>zwav</h1>
        </a>
      </Link>
      <Link href='/'>
        <a className='text-white'>home</a>
      </Link>
      <Link href='/posts'>
        <a className='text-white'>posts</a>
      </Link>
    </div>
  );
};
