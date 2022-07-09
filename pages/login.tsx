import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { gql, useLazyQuery } from '@apollo/client';

const Login: NextPage = () => {
  const getLoginInfo = (): { email: string; password: string } => {
    let email: string | undefined, password: string | undefined;

    if (typeof window !== 'undefined') {
      email = (document.getElementById('email') as HTMLInputElement)?.value;
      password = (document.getElementById('password') as HTMLInputElement)?.value;

      return { email, password };
    }
  };

  const query = gql`
    query ($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        id
        response
      }
    }
  `;

  const [_login, { data }] = useLazyQuery(query);

  const router = useRouter();

  const login = async () => {
    if (typeof (await data) === 'undefined' || (await data.login.response) !== 'success') {
      _login({ variables: { email: getLoginInfo()?.email, password: getLoginInfo()?.password } }).then(({ data }) => {
        console.log(data);
        const { response } = data.login;

        if (response === 'failure') {
          document.getElementById('error').innerHTML = 'provide an email & password';
          return;
        }
        if (response === 'user_does_not_exist') {
          document.getElementById('error').innerHTML = 'user does not exist';
          return;
        }
        if (response === 'wrong_password') {
          document.getElementById('error').innerHTML = 'wrong password';
          return;
        }
        if (response === 'success') {
          document.getElementById('error').innerHTML = 'redirecting...';
          router.push('/posts');
        }
      });
    }
  };

  return (
    <div className='bg-zwav-gray-200 min-h-[100vh]'>
      <Head>
        <title>login</title>
      </Head>
      <div className='flex justify-center items-center h-[100vh]'>
        <div className='bg-zwav-gray-300 p-[12px] pb-0 rounded-[8px] mb-[100px]'>
          <h1 className='text-white m-auto w-[max-content]'>login</h1>
          <div className='w-[100%] bg-zwav-gray-100 h-[2px] mb-[10px]'></div>
          <div className='grid w-[300px] mb-[6px]'>
            <div>
              <h1 className='text-white'>email</h1>
              <input id='email' className='bg-zwav-gray-400 rounded-[8px] w-[100%] outline-none text-white pl-[4px]'></input>
            </div>
            <div>
              <h1 className='text-white'>password</h1>
              <input id='password' className='bg-zwav-gray-400 rounded-[8px] w-[100%] outline-none text-white pl-[4px]'></input>
            </div>
            <div className='flex justify-center pt-[6px]'>
              <button onClick={() => login()} className='w-[80px] rounded-[8px] transition ease-in-out border-none bg-zwav-color hover:bg-zwav-color-hover duration-[0.25s]'>
                <h2 className='text-white'>login</h2>
              </button>
            </div>
            <div className='flex justify-center pt-[6px]'>
              <h1 id='error' className='text-white'></h1>
            </div>
            <div className='w-[100%] bg-zwav-gray-100 h-[2px] mt-[10px]'></div>
            <div className='flex justify-center pt-[6px]'>
              <Image src='/zwav_logo.svg' width={20} height={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
