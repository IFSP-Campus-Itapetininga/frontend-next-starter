import { useState } from 'react';
import { MarmitaEstatistica } from 'views';

import { getMarmitaStatistics } from 'services';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { format, subDays } from 'date-fns';
import { getCookie } from 'cookies-next';

const filterProps = {
  initial_date: subDays(new Date(), 30),
  final_date: new Date(),
};

export default function MarmitaProdutoPage({ token }) {
  const [filter, setFilter] = useState(filterProps);

  const {
    data: statistics,
    isLoading,
    isFetching,
  } = useQuery(['getAllMarmitaClients', filter], () =>
    getMarmitaStatistics({ filter, token })
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

export async function getServerSideProps({ req, res }) {
  const token = getCookie('auth.token', { req, res });

  const queryClient = new QueryClient();

  if (token) {
    await queryClient.prefetchQuery(['getMarmitaStatistics', filterProps], () =>
      getMarmitaStatistics({ filter: filterProps, token })
    );

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        token,
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
