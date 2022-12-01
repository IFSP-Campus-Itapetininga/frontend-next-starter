import { useState } from 'react';
import { MarmitaEstatistica } from 'views';

import { getMarmitaStatistics } from 'services';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { format, subDays } from 'date-fns';

const filterProps = {
  initial_date: subDays(new Date(), 30),
  final_date: new Date(),
};

export default function MarmitaProdutoPage() {
  const [filter, setFilter] = useState(filterProps);

  const {
    data: statistics,
    isLoading,
    isFetching,
  } = useQuery(['getAllMarmitaClients', filter], () =>
    getMarmitaStatistics(filter)
  );

  return (
    <MarmitaEstatistica
      statistics={statistics}
      isLoading={isLoading && isFetching}
      setFilter={setFilter}
      filter={filter}
    />
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['getMarmitaStatistics', filterProps], () =>
    getMarmitaStatistics(filterProps)
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}
