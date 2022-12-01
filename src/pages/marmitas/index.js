import { MarmitaHome } from 'views';

import { getAllMarmitaOrders } from 'services';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

const filterProps = {
  page: 1,
  limit: 6,
  filter: 'started',
};

export default function MarmitaPage() {
  const { data: orders, isLoading } = useQuery(['getActiveMarmitaOrders'], () =>
    getAllMarmitaOrders(filterProps)
  );

  return <MarmitaHome orders={orders} isLoading={isLoading} />;
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['getActiveMarmitaOrders'], () =>
    getAllMarmitaOrders(filterProps)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
