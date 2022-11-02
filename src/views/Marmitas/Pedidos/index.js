import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Layout } from 'layout';
import { useForm, FormProvider } from 'react-hook-form';

import {
  Input,
  Table,
  Tooltip,
  Pagination,
  Loading,
  ButtonIcon,
} from 'components';
import { Header } from '../components';
import { Cadastro } from './Cadastro';
import { DeleteProduct } from './Delete';

import { convertMonetary } from 'utils';

const tableHeader = [
  {
    name: '#',
    acessor: 'id',
  },
  {
    name: 'Produto',
    acessor: 'titulo',
  },
  {
    name: 'Preço',
    acessor: 'preco',
  },
  {
    name: 'Ações',
    acessor: 'action',
  },
];

export default function MarmitaView({
  products,
  filter,
  setFilter,
  isLoading,
}) {
  const [tableData, setTableData] = useState([]);
  const [showProductModal, setShowProductModal] = useState('');
  const [showDeletModal, setShowDeleteModal] = useState('');

  const methods = useForm();

  useEffect(() => {
    const result = products?.data.map(({ id, titulo, preco }) => {
      return {
        id,
        titulo,
        preco: convertMonetary(preco),
        action: () => {
          return (
            <div className="d-flex align-items-center justify-content-center gap-4">
              <div className="d-flex align-items-center justify-content-center gap-4">
                <ButtonIcon
                  icon="/icons/pencil-square.svg"
                  tip="Editar produto"
                  variant="primary"
                  action={() => setShowProductModal(`edit ${id}`)}
                />
                <ButtonIcon
                  icon="/icons/trash-fill.svg"
                  tip="Remover produto"
                  variant="danger"
                  action={() => setShowDeleteModal(id)}
                />
              </div>
            </div>
          );
        },
      };
    });

    setTableData(result);
  }, [products]);

  const onSubmit = async ({ titulo }) => {
    setFilter({
      ...filter,
      search: titulo,
    });
  };

  const handlePagination = (type) => {
    const pagination = {
      first: 1,
      prev: filter.page - 1,
      next: filter.page + 1,
    }[type];

    setFilter({
      ...filter,
      page: pagination || 1,
    });
  };

  return (
    <Layout session="Marmitas">
      <Container className="py-4">
        <Header
          route="/marmitas"
          sectionTitle="Pedidos"
          action={() => setShowProductModal('create')}
        />

        <div className="mt-4">
          <FormProvider {...methods}>
            <form
              className="d-flex rounded-1 flex-row align-items-end gap-3 justify-content-end"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <Input
                name="titulo"
                placeholeder="Buscar pedidos"
                label="Pedidos"
              />

              <Button variant="primary" type="submit">
                Buscar
              </Button>

              {!!filter.search && (
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => {
                    setFilter({ ...filter, search: '' });
                    methods.reset('');
                  }}
                >
                  Limpar
                </Button>
              )}
            </form>
          </FormProvider>
        </div>
        <div className="mt-4">
          <Table header={tableHeader} data={tableData} />

          <Pagination
            page={products?.page}
            end={products?.page === products?.totalPage}
            handlePaginate={handlePagination}
          />
        </div>
      </Container>

      <Cadastro
        showModal={showProductModal}
        setShowModal={setShowProductModal}
      />

      <DeleteProduct
        showModal={showDeletModal}
        setShowModal={setShowDeleteModal}
      />

      <Loading show={isLoading} />
    </Layout>
  );
}
