import { useState } from 'react';
import { MarmitaPedidos } from 'views';

import { getAllMarmitaOrders } from 'services';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';

const filterProps = {
  page: 1,
  limit: 8,
};

export default function MarmitaPedidosPage({ token }) {
  const [filter, setFilter] = useState(filterProps);

  const { data: orders, isLoading } = useQuery(
    ['getAllMarmitaOrders', filter],
    () => getAllMarmitaOrders({ filter, token })
  );

  return (
    <MarmitaPedidos
      filter={filter}
      setFilter={setFilter}
      orders={orders}
      isLoading={isLoading}
    />
  );
}

export async function getServerSideProps({ req, res }) {
  const authToken = getCookie('auth.token', { req, res });
  const queryClient = new QueryClient();

  if (authToken) {
    await queryClient.prefetchQuery(['getAllMarmitaOrders', filterProps], () =>
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
