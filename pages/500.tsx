import { NextPage } from 'next';
import { ErrorPage } from '@components/ErrorPage';

const Page500: NextPage = () => {
  return <ErrorPage error={500} message={"there was an error with the server or this page doesn't exist"} />;
};

export default Page500;
