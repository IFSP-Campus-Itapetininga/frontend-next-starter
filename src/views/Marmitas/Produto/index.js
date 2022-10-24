import { Container, Button, OverlayTrigger } from 'react-bootstrap';
import { useForm, FormProvider } from 'react-hook-form';

import { Layout } from 'layout';
import { Input, Table, Tooltip, Pagination } from 'components';
import { Header } from '../components';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function MarmitaView({ products, filter, setFilter }) {
  const [tableData, setTableData] = useState([]);
  const methods = useForm();

  useEffect(() => {
    const result = products?.data.map(({ id, titulo, preco }) => {
      return {
        id,
        titulo,
        preco,
        action: () => {
          return (
            <div className="d-flex align-items-center justify-content-center gap-4">
              <Tooltip text="Editar produto">
                <Button
                  className="py-2 px-2 d-flex align-items-center justify-content-center"
                  variant="primary"
                >
                  <Image
                    src="/icons/pencil-square.svg"
                    width="16px"
                    height="16px"
                    alt="Icone editar"
                  />
                </Button>
              </Tooltip>
              <Tooltip text="Remover produto">
                <Button
                  className="py-2 px-2 d-flex align-items-center justify-content-center"
                  variant="danger"
                >
                  <Image
                    src="/icons/trash-fill.svg"
                    width="16px"
                    height="16px"
                    alt="Icone lixeira"
                  />
                </Button>
              </Tooltip>
            </div>
          );
        },
      };
    });

    setTableData(result);
  }, []);

  const onSubmit = async (values) => {
    console.log(values);
  };

  const handlePagination = (type) => {
    const pagination = {
      first: 1,
      prev: filter.page - 1,
      next: filter.page + 1,
    }[type];

    console.log(pagination);

    setFilter({
      ...filter,
      page: pagination || 1,
    });
  };

  return (
    <Layout session="Marmitas">
      <Container className="py-4">
        <Header />

        <div className="mt-4">
          <FormProvider {...methods}>
            <form
              className="d-flex rounded-1 flex-row align-items-end gap-3 justify-content-end"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <Input
                name="titulo"
                placeholeder="Buscar produtos"
                label="Produtos"
              />

              <Button variant="primary" type="submit">
                Buscar
              </Button>
            </form>
          </FormProvider>
        </div>
        <div className="mt-4">
          <Table
            header={[
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
            ]}
            data={tableData}
          />

          <Pagination
            page={products?.page}
            end={products?.page === products?.totalPage}
            handlePaginate={handlePagination}
          />
        </div>
      </Container>
    </Layout>
  );
}
