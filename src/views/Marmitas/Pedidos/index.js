import { Fragment, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Layout } from 'layout';
import Badge from 'react-bootstrap/Badge';

import { Table, Pagination, Loading, ButtonIcon } from 'components';
import { Header } from '../components';
import { Cadastro } from './Cadastro';
import { EditStatus } from './EditStatus';

import { convertMonetary } from 'utils';

const tableHeader = [
  {
    name: '#',
    acessor: 'id',
  },
  {
    name: 'produto',
    acessor: 'produto',
  },
  {
    name: 'Cliente',
    acessor: 'client',
  },
  {
    name: 'Valor',
    acessor: 'valor',
  },
  {
    name: 'Status',
    acessor: 'status',
  },
  {
    name: 'Ações',
    acessor: 'action',
  },
];

const orderStatusEnun = {
  started: 'Iniciado',
  finalized: 'Completo',
  canceled: 'Cancelado',
};

export default function MarmitaView({ orders, filter, setFilter, isLoading }) {
  const [tableData, setTableData] = useState([]);
  const [showProductModal, setShowProductModal] = useState('');
  const [showEditModal, setShowEditModal] = useState('');

  useEffect(() => {
    const result = orders?.data.map(
      ({ id, status, cliente, valor_total, produtos }) => {
        return {
          id,
          produto: () =>
            produtos?.map((el, id) => (
              <Fragment key={id}>
                <span>
                  {el.quantidade}x {el.titulo}
                </span>
                <br />
              </Fragment>
            )),
          client: cliente?.nome,
          status: () => (
            <Badge
              bg={
                {
                  started: 'primary',
                  finalized: 'success',
                  canceled: 'warning',
                }[status]
              }
            >
              {orderStatusEnun[status]}
            </Badge>
          ),
          valor: convertMonetary(valor_total),
          action: () => {
            return (
              <div className="d-flex align-items-center justify-content-center gap-4">
                {status === 'started' && (
                  <div className="d-flex align-items-center justify-content-center gap-4">
                    <ButtonIcon
                      icon="/icons/pencil-square.svg"
                      tip="Alterar status"
                      variant="primary"
                      action={() => setShowEditModal(id)}
                    />
                  </div>
                )}
              </div>
            );
          },
        };
      }
    );

    setTableData(result);
  }, [orders]);

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
          <Table header={tableHeader} data={tableData} />

          <Pagination
            page={orders?.page}
            end={orders?.page === orders?.totalPage}
            handlePaginate={handlePagination}
          />
        </div>
      </Container>

      <Cadastro
        showModal={showProductModal}
        setShowModal={setShowProductModal}
      />

      <EditStatus showModal={showEditModal} setShowModal={setShowEditModal} />

      <Loading show={isLoading} />
    </Layout>
  );
}
