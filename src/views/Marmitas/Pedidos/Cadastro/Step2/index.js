import { useState } from 'react';

import { AsyncSelect } from 'components';
import { useQuery } from '@tanstack/react-query';
import { useForm, FormProvider } from 'react-hook-form';

import { getAllMarmitaProducts } from 'services';

import { yupResolver } from '@hookform/resolvers/yup';
import schema from './validation';

export function Step2({ nextStep, previousStep, setFormData, ...props }) {
  const [search, setSearch] = useState('');
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
            label: el.titulo,
          };
        }),
    }
  );

  const onSubmit = methods.handleSubmit(async (values) => {
    setFormData((state) => {
      return { ...state, pedido: values };
    });

    nextStep();
  });

  return (
    <FormProvider {...methods}>
      <form className="py-2" onSubmit={onSubmit}>
        <div className="mb-3 d-flex align-items-end gap-3">
          <div className="w-100">
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

          {/* <button onClick={onSubmit}>prox</button> */}
          <button onClick={previousStep}>previousStep</button>
        </div>
      </form>
    </FormProvider>
  );
}
