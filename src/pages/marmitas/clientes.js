import { useState } from 'react';
import { MarmitaCliente } from 'views';

import { getAllMarmitaClients } from 'services';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

const filterProps = {
  page: 1,
  limit: 8,
  search: '',
};

export default function MarmitaProdutoPage() {
  const [filter, setFilter] = useState(filterProps);

  const { data: clients, isLoading } = useQuery(
    ['getAllMarmitaClients', filter],
    () => getAllMarmitaClients(filter)
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

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['getAllMarmitaClients', filterProps], () =>
    getAllMarmitaClients(filterProps)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
