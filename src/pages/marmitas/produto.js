import { useState } from 'react';
import { MarmitaProduto } from 'views';

import { getAllMarmitaProducts } from 'services';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';

const filterProps = {
  page: 1,
  limit: 8,
  search: '',
};

export default function MarmitaProdutoPage({ token }) {
  const [filter, setFilter] = useState(filterProps);

  const { data: products, isLoading } = useQuery(
    ['getAllMarmitaProducts', filter],
    () => getAllMarmitaProducts({ filter, token })
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

export async function getServerSideProps({ req, res }) {
  const token = getCookie('auth.token', { req, res });

  const queryClient = new QueryClient();

  if (token) {
    await queryClient.prefetchQuery(
      ['getAllMarmitaProducts', filterProps],
      () => getAllMarmitaProducts({ filter: filterProps, token })
    );

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
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
