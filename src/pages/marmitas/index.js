import { MarmitaHome } from 'views';

import api, { getAllMarmitaOrders } from 'services';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

import { getCookie } from 'cookies-next';

const filterProps = {
  page: 1,
  limit: 6,
  filter: 'started',
};

export default function MarmitaPage({ token }) {
  const { data: orders, isLoading } = useQuery(['getActiveMarmitaOrders'], () =>
    getAllMarmitaOrders({ filter: filterProps, token })
  );

  return <MarmitaHome orders={orders} isLoading={isLoading} />;
}

export async function getServerSideProps({ req, res }) {
  const authToken = getCookie('auth.token', { req, res });
  const queryClient = new QueryClient();

  if (authToken) {
    await queryClient.prefetchQuery(['getActiveMarmitaOrders'], () =>
      getAllMarmitaOrders({ filter: filterProps, token: authToken })
    );

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        token: authToken,
      },
    };
  }

  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
}
