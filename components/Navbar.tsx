import { FC, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Cookie from 'js-cookie';
import { useLazyQuery, useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';

import logo from '@public/zwav_logo.svg';
import { parseTwemoji } from '@utils/parseTwemoji';

export const Navbar: FC = () => {
  const router = useRouter();

  const query = gql`
    query ($id: ID!) {
      user(id: $id) {
        username
        id
        createdAt
      }
    }
  `;

  const logoutQuery = gql`
    query {
      logout
    }
  `;

  const refreshQuery = gql`
    query {
      refreshUser
    }
  `;

  const { data } = useQuery(query, { variables: { id: Cookie.get('currentUserId') } });
  const [reqLogout] = useLazyQuery(logoutQuery);
  const [refreshUser, { refetch }] = useLazyQuery(refreshQuery);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const logout = () => {
    reqLogout();
    router.reload();
  };

  return (
    <div className='fixed bg-zwav-gray-400 grid grid-cols-[max-content_auto_max-content] h-[50px] w-[100%]'>
      <Link href='/posts'>
        <a className='grid grid-cols-2 place-items-center h-[100%]'>
          <div className='select-none m-[auto] h-[25px]'>
            <Image src={logo} height={25} width={25} id='navbar-icon' alt='' />
          </div>
          <h1 className='text-white'>zwav</h1>
        </a>
      </Link>
      <h1 className='self-center flex justify-center text-white'>add search bar</h1>
      <div className='grid grid-cols-[max-content_max-content_max-content_max-content] gap-x-[8px] pr-[20px] place-items-center w-[max-content]'>
        <Link href='/'>
          <a className='text-white'>home</a>
        </Link>
        <Link href='/posts'>
          <a className='text-white'>posts</a>
        </Link>
        {data ? (
          <div className='grid grid-cols-[max-content_max-content] gap-x-[8px]'>
            <Link href={`${router.basePath}/users/${data.user.id}`}>
              <a className='text-white'>{parseTwemoji(data ? data.user.username : '', 'pointer')}</a>
            </Link>
            <h1 className='text-white cursor-pointer' onClick={() => logout()}>
              logout
            </h1>
          </div>
        ) : (
          <div className='grid grid-cols-[max-content_max-content] gap-x-[8px]'>
            <Link href='/register'>
              <a className='text-white'>register</a>
            </Link>
            <Link href='/login'>
              <a className='text-white'>login</a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
