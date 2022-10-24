import { useState } from 'react';
import { MarmitaProduto } from 'views';

const mockData = {
  data: [
    {
      id: 2,
      titulo: 'Marmita de frango com batata (P)',
      preco: 15,
      criadoEm: '2022-10-22T05:10:37.000Z',
      alteradoEm: '2022-10-22T05:10:37.000Z',
    },
    {
      id: 3,
      titulo: 'Bife acebolado (G)',
      preco: 18,
      criadoEm: '2022-10-22T05:10:37.000Z',
      alteradoEm: '2022-10-22T05:10:37.000Z',
    },
    {
      id: 4,
      titulo: 'Coca-cola 2L',
      preco: 8,
      criadoEm: '2022-10-22T05:10:37.000Z',
      alteradoEm: '2022-10-22T05:10:37.000Z',
    },
  ],
  limit: 12,
  page: 1,
  totalPage: 1,
};

export default function MarmitaProdutoPage() {
  const [filter, setFilter] = useState({ page: 1, limit: 12, search: '' });

  return (
    <MarmitaProduto filter={filter} setFilter={setFilter} products={mockData} />
  );
}

export async function getServerSideProps() {
  return { props: {} };
}
