import { useState } from 'react';
import { MarmitaProduto } from 'views';

import { getAllMarmitaProducts } from 'services';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

const filterProps = {
  page: 1,
  limit: 8,
  search: '',
};

export default function MarmitaProdutoPage() {
  const [filter, setFilter] = useState(filterProps);

  const { data: products, isLoading } = useQuery(
    ['getAllMarmitaProducts', filter],
    () => getAllMarmitaProducts(filter)
  );

  return (
    <MarmitaProduto
      filter={filter}
      setFilter={setFilter}
      products={products}
      isLoading={isLoading}
    />
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['getAllMarmitaProducts', filterProps], () =>
    getAllMarmitaProducts(filterProps)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
