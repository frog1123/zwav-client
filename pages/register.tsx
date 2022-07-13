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

    if (username.length === 0) {
      document.getElementById('error').innerHTML = 'username must be longer than 0 characters';
      return;
    }
    if (username.length > 29) {
      document.getElementById('error').innerHTML = 'username must be less than 30 characters';
      return;
    }
    if (email.length === 0) {
      document.getElementById('error').innerHTML = 'email is required';
      return;
    }
    if (password.length < 8) {
      document.getElementById('error').innerHTML = 'password must be at least 8 characters';
    }
    if (password !== passwordConfirmed) {
      document.getElementById('error').innerHTML = 'passwords do not match';
      return;
    }

    _registerUser({ variables: { username, email, password, createdAt: new Date().getTime().toString() } }).then(({ data }) => {
      if (data.registerUser === 'email_invalid') document.getElementById('error').innerHTML = 'this email is invalid';
      if (data.registerUser === 'email_already_used') document.getElementById('error').innerHTML = 'this email has already been registered';
      if (data.registerUser === 'success') {
        document.getElementById('error').innerHTML = 'account created - redirecting...';
        router.push('/login');
      }
    });
  };

  return (
    <>
      <Head>
        <title>register</title>
      </Head>
      <div className='flex justify-center items-center h-[100vh]'>
        <div className='bg-zwav-gray-300 p-[12px] pb-0 rounded-[8px] mb-[100px]'>
          <h1 className='text-white m-auto w-[max-content]'>register</h1>
          <div className='w-[100%] bg-zwav-gray-100 h-[2px] mb-[10px]'></div>
          <div className='grid w-[300px] mb-[6px]'>
            <div>
              <h1 className='text-white'>create a username</h1>
              <input id='username' placeholder='must be under 30 characters' className='bg-zwav-gray-400 rounded-[8px] w-[100%] outline-none text-white pl-[4px]'></input>
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
          <div className='flex justify-center'>
            <h1 id='error' className='text-white'></h1>
          </div>
          <div className='flex justify-center pb-[6px]'>
            <button onClick={() => registerUser()} className='w-[80px] rounded-[8px] transition ease-in-out border-none bg-zwav-color hover:bg-zwav-color-hover duration-[0.25s]'>
              <h2 className='text-white'>register</h2>
            </button>
          </div>
          <div className='w-[100%] bg-zwav-gray-100 h-[2px] mb-[4px]'></div>
          <div className='flex justify-center pb-[6px]'>
            <Image src='/zwav_logo.svg' width={20} height={20} alt='' />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
