import { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Layout } from 'layout';
import { useForm, FormProvider } from 'react-hook-form';

import { Input, Table, Pagination, Loading, ButtonIcon } from 'components';
import { Header } from '../components';
import { Cadastro } from './Cadastro';
import { DeleteProduct } from './Delete';

import { formatCelphoneNumber } from 'utils';

const tableHeader = [
  {
    name: '#',
    acessor: 'id',
  },
  {
    name: 'Nome',
    acessor: 'nome',
  },
  {
    name: 'Celular',
    acessor: 'telefone',
  },
  {
    name: 'Rua',
    acessor: 'rua',
  },
  {
    name: 'Bairro',
    acessor: 'bairro',
  },
  {
    name: 'Número',
    acessor: 'numero',
  },
  {
    name: 'Ações',
    acessor: 'action',
  },
];

export default function ClientesView({
  clients,
  filter,
  setFilter,
  isLoading,
}) {
  const [tableData, setTableData] = useState([]);
  const [showProductModal, setShowProductModal] = useState('');
  const [showDeletModal, setShowDeleteModal] = useState('');

  const methods = useForm();

  useEffect(() => {
    const result = clients?.data.map((client) => {
      return {
        id: client.id,
        nome: client.nome,
        telefone: formatCelphoneNumber(client.telefone),
        rua: client.rua,
        numero: client.numero,
        bairro: client.bairro,
        action: () => {
          return (
            <div className="d-flex align-items-center justify-content-center gap-4">
              <ButtonIcon
                icon="/icons/pencil-square.svg"
                tip="Editar cliente"
                variant="primary"
                action={() => setShowProductModal(`edit ${client.id}`)}
              />
              <ButtonIcon
                icon="/icons/trash-fill.svg"
                tip="Remover cliente"
                variant="danger"
                action={() => setShowDeleteModal(client.id)}
              />
            </div>
          );
        },
      };
    });

    setTableData(result);
  }, [clients]);

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
          sectionTitle="Clientes"
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
                placeholeder="Buscar clientes"
                label="Clientes"
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
            page={clients?.page}
            end={clients?.page === clients?.totalPage}
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
