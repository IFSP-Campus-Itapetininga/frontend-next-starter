import { useEffect, useState } from 'react';

import { AsyncSelect, ButtonIcon, Input, Table } from 'components';
import { useQuery } from '@tanstack/react-query';
import { useForm, FormProvider } from 'react-hook-form';
import styled from './step2.module.scss';

import { Button } from 'react-bootstrap';

import { getAllMarmitaProducts } from 'services';

import { yupResolver } from '@hookform/resolvers/yup';
import schema from './validation';
import { convertMonetary } from 'utils';

export function Step2({
  nextStep,
  previousStep,
  setFormData,
  formData,
  ...props
}) {
  const [search, setSearch] = useState('');
  const [newProduct, setNewProduct] = useState(false);
  const [orders, setOrders] = useState([]);

  const methods = useForm({ resolver: yupResolver(schema) });

  const { data, isLoading } = useQuery(
    ['getProductsToSeatch', { search, limit: 5 }],
    () => getAllMarmitaProducts({ search, limit: 5 }),
    {
      enabled: props.currentStep === 2,
      select: ({ data }) =>
        data?.map((el) => {
          return {
            value: el.id,
            label: `${el.titulo} - ${convertMonetary(el.preco)}`,
            titulo: el.titulo,
            preco: el.preco,
          };
        }),
    }
  );

  const onSubmit = methods.handleSubmit(async (values) => {
    const quantidade = parseInt(values.quantidade);
    const produtos = {
      id: values.produto.value,
      titulo: values.produto.titulo,
      preco: values.produto.preco * quantidade,
      unit_price: values.produto.preco,
      formate_price: convertMonetary(values.produto.preco * quantidade),
      quantidade: quantidade,
    };

    setOrders((state) => [...state, produtos]);
    setNewProduct(false);
  });

  const handleNextStep = () => {
    if (!orders.length) {
      return;
    }

    setFormData((state) => {
      return { ...state, produtos: orders };
    });

    nextStep();
  };

  useEffect(() => {
    if (Array.isArray(formData) && !formData?.length) {
      setOrders([]);
    }
  }, [formData]);

  const renderOrderForm = () => {
    return (
      <form
        className={`py-2 ${styled.formWrapper} ${
          newProduct ? styled['show'] : ''
        }`}
        onSubmit={onSubmit}
      >
        <div className="mb-3 d-flex align-items-end gap-3">
          <div className="w-75">
            <AsyncSelect
              name="produto"
              label="Produto"
              placeholder="Selecione um produto"
              options={data}
              search={search}
              findNewData={setSearch}
              isLoading={isLoading}
              isRequired
            />
          </div>
          <div className="w-25">
            <Input
              name="quantidade"
              label="Quantidade"
              placeholeder="0"
              type="number"
              min="1"
            />
          </div>
        </div>

        <Button variant="success" onClick={onSubmit}>
          Adicionar
        </Button>
      </form>
    );
  };

  return (
    <FormProvider {...methods}>
      <div>
        <h5 className="card-title">Dados do pedido</h5>
      </div>

      <div className="my-3">
        <ButtonIcon
          icon="/icons/plus-lg.svg"
          tip="Novo Produto"
          variant="primary"
          action={() => setNewProduct(true)}
        />
      </div>

      {renderOrderForm()}

      {orders.length > 0 && (
        <div className="mb-3">
          <h5 className="card-title mb-3">Selecionados</h5>
          <Table
            header={[
              { name: 'Produto', acessor: 'titulo' },
              { name: 'Preco', acessor: 'formate_price' },
              { name: 'Qty', acessor: 'quantidade' },
            ]}
            data={orders}
          />
        </div>
      )}

      <div className="w-100 d-flex justify-content-end gap-2">
        <Button variant="outline-secondary" onClick={previousStep}>
          Voltar
        </Button>
        <Button
          variant="outline-primary"
          onClick={handleNextStep}
          disabled={!orders.length}
        >
          Próximo
        </Button>
      </div>
    </FormProvider>
  );
}
