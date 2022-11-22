import { useState } from 'react';
import { MarmitaEstatistica } from 'views';

import { getMarmitaStatistics } from 'services';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

const filterProps = {
  initial_date: '2022-07-05',
  final_date: '2022-10-10',
};

export default function MarmitaProdutoPage() {
  const [filter, setFilter] = useState(filterProps);

  const { data: statistics, isLoading } = useQuery(
    ['getAllMarmitaClients', filter],
    () => getMarmitaStatistics(filter)
  );

  console.log('asd', statistics);

  return <MarmitaEstatistica statistics={statistics} />;
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['getMarmitaStatistics', filterProps], () =>
    getMarmitaStatistics(filterProps)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
