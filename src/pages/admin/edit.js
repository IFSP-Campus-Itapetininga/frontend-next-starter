import * as adminService from 'services/admin';
import Edit from 'views/Admin/Edit';
import { getCookie } from 'cookies-next';

export default function EditPage(props) {
  return <Edit {...props} />;
}

export async function getServerSideProps({ req, res, query }) {
  const token = getCookie('auth.token', { req, res });

  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  const user = await adminService.find(query.id, token);

  return {
    props: {
      user,
    },
  };
}
