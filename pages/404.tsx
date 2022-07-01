import { NextPage } from 'next';
import { ErrorPage } from '../components/ErrorPage';

const Page404: NextPage = () => {
  return <ErrorPage error={404} message={'this page could not be find'} />;
};

export default Page404;
