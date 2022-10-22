import { Container, Button, OverlayTrigger } from 'react-bootstrap';
import { useForm, FormProvider } from 'react-hook-form';

import { Layout } from 'layout';
import { Input, Table, Tooltip } from 'components';
import { Header } from '../components';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const mockData = [
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
];

export default function MarmitaView() {
  const [data, setData] = useState([]);
  const methods = useForm();

  useEffect(() => {
    const result = mockData.map(({ id, titulo, preco }) => {
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

    setData(result);
  }, []);

  console.log(data);

  const onSubmit = async (values) => {
    console.log(values);
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
            data={data}
          />
        </div>
      </Container>
    </Layout>
  );
}
