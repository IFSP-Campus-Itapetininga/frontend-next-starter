import * as adminService from 'services/admin';
import { Admin } from 'views';
import { getCookie } from 'cookies-next';

export default function AdminPage(props) {
  return <Admin {...props} />;
}

export async function getServerSideProps({ req, res }) {
  const token = getCookie('auth.token', { req, res });

  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  const users = await adminService.list(token);

  return {
    props: {
      users,
    },
  };
}
