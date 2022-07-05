import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

const Register: NextPage = () => {
  const router = useRouter();

  const getRegisterInfo = (): { username: string; email: string; password: string; passwordConfirmed: string } => {
    let username: string | undefined, email: string | undefined, password: string | undefined, passwordConfirmed: string | undefined;

    if (typeof window !== 'undefined') {
      username = (document.getElementById('username') as HTMLInputElement)?.value;
      email = (document.getElementById('email') as HTMLInputElement)?.value;
      password = (document.getElementById('password') as HTMLInputElement)?.value;
      passwordConfirmed = (document.getElementById('password-confirm') as HTMLInputElement)?.value;

      return { username, email, password, passwordConfirmed };
    }
  };

  const mutation = gql`
    mutation ($username: String!, $email: String!, $password: String!, $createdAt: String!) {
      registerUser(username: $username, email: $email, password: $password, createdAt: $createdAt)
    }
  `;

  const [_registerUser] = useMutation(mutation);

  const registerUser = async () => {
    const { username, email, password, passwordConfirmed } = getRegisterInfo();

    if (username.length === 0) return;
    if (email.length === 0) return;
    if (password.length < 8) return;
    if (password !== passwordConfirmed) return;

    // add check if email is used

    _registerUser({ variables: { username, email, password, createdAt: new Date().getTime().toString() } }).then(() => router.push('/login'));
  };

  return (
    <div className='bg-zwav-gray-200 min-h-[100vh]'>
      <Head>
        <title>register</title>
        <link rel='icon' href='/zwav_logo.svg' />
      </Head>
      <div className='flex justify-center items-center h-[100vh]'>
        <div className='bg-zwav-gray-300 p-[12px] pb-0 rounded-[8px] mb-[100px]'>
          <h1 className='text-white m-auto w-[max-content]'>register</h1>
          <div className='w-[100%] bg-zwav-gray-100 h-[2px] mb-[10px]'></div>
          <div className='grid w-[300px] mb-[6px]'>
            <div>
              <h1 className='text-white'>create a username</h1>
              <input id='username' placeholder='e.g frogdude1123' className='bg-zwav-gray-400 rounded-[8px] w-[100%] outline-none text-white pl-[4px]'></input>
            </div>
            <div>
              <h1 className='text-white'>email</h1>
              <input id='email' placeholder='e.g frog1123@example.com' className='bg-zwav-gray-400 rounded-[8px] w-[100%] outline-none text-white pl-[4px]'></input>
            </div>
            <div>
              <h1 className='text-white'>create a password</h1>
              <input id='password' placeholder='must be over 8 characters' className='bg-zwav-gray-400 rounded-[8px] w-[100%] outline-none text-white pl-[4px]'></input>
            </div>
            <div>
              <h1 className='text-white'>confirm password</h1>
              <input id='password-confirm' placeholder='confirm' className='bg-zwav-gray-400 rounded-[8px] w-[100%] outline-none text-white pl-[4px]'></input>
            </div>
          </div>
          <div className='flex justify-center pb-[6px]'>
            <button onClick={() => registerUser()} className='w-[80px] rounded-[8px] transition ease-in-out border-none bg-zwav-color hover:bg-zwav-color-hover duration-[0.25s]'>
              <h2 className='text-white'>register</h2>
            </button>
          </div>
          <div className='w-[100%] bg-zwav-gray-100 h-[2px] mb-[4px]'></div>
          <div className='flex justify-center pb-[6px]'>
            <Image src='/zwav_logo.svg' width={20} height={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
