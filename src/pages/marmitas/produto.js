import { useState } from 'react';
import { MarmitaProduto } from 'views';

import { getAllProducts } from 'services';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

const filterProps = {
  page: 1,
  limit: 8,
  search: '',
};

export default function MarmitaProdutoPage() {
  const [filter, setFilter] = useState(filterProps);

  const { data: products, isLoading } = useQuery(
    ['getAllProducts', filter],
    () => getAllProducts(filter)
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

  await queryClient.prefetchQuery(['getAllProducts', filterProps], () =>
    getAllProducts(filterProps)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
