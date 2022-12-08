import { useState } from 'react';
import { MarmitaCliente } from 'views';

import { getAllMarmitaClients } from 'services';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';

const filterProps = {
  page: 1,
  limit: 8,
  search: '',
};

export default function MarmitaProdutoPage({ token }) {
  const [filter, setFilter] = useState(filterProps);

  const { data: clients, isLoading } = useQuery(
    ['getAllMarmitaClients', filter],
    () => getAllMarmitaClients({ filter, token })
  );

  return (
    <MarmitaCliente
      filter={filter}
      setFilter={setFilter}
      clients={clients}
      isLoading={isLoading}
    />
  );
}

export async function getServerSideProps({ req, res }) {
  const authToken = getCookie('auth.token', { req, res });
  const queryClient = new QueryClient();

  if (authToken) {
    await queryClient.prefetchQuery(['getAllMarmitaClients', filterProps], () =>
      getAllMarmitaClients({ filter: filterProps, token: authToken })
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
