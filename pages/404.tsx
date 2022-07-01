import { NextPage } from 'next';
import { ErrorPage } from '../components/ErrorPage';

const Page404: NextPage = () => {
  return <ErrorPage error={404} message={"this page doesn't exist"} />;
};

export default Page404;
