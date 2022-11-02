import { useState } from 'react';
import { Modal, Input, Loading, ButtonIcon, AsyncSelect } from 'components';
import { useForm, FormProvider } from 'react-hook-form';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getAllMarmitaProducts } from 'services';
import { yupResolver } from '@hookform/resolvers/yup';

import schema from './validation';

export function Cadastro({ showModal, setShowModal }) {
  const methods = useForm({ resolver: yupResolver(schema) });

  const [search, setSearch] = useState('');
  const enableModal = showModal.split(' ');

  const { data, isLoading } = useQuery(
    ['getProductsToSeatch', search],
    () => getAllMarmitaProducts({ search }),
    {
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
    console.log('data', values);
  });

  const handleCloseModal = () => {
    setShowModal('');
    methods.reset('');
  };

  return (
    <>
      <Modal
        show={!!showModal}
        setShow={handleCloseModal}
        title="Cadastro de Produto"
        buttonText={enableModal[0] === 'edit' ? 'Editar' : 'Cadastrar'}
        handleButton={onSubmit}
      >
        <FormProvider {...methods}>
          <form className="py-2" onSubmit={onSubmit}>
            <div className="mb-3 d-flex align-items-center gap-3">
              <div className="w-100">
                <Input
                  name="telefone"
                  placeholeder="Celular do cliente"
                  label="Celular"
                  mask="phone"
                  inputMode="numeric"
                />
              </div>
              <ButtonIcon
                icon="/icons/search.svg"
                tip="Editar cliente"
                variant="primary"
                action={() => console.log('abriu')}
              />
            </div>
            <div className="mb-3 d-flex align-items-end gap-3">
              <div className="w-100">
                <AsyncSelect
                  name="produto"
                  label="Produto"
                  placeholder="Selecione um produto"
                  options={data}
                  search={search}
                  findNewData={setSearch}
                  isRequired
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </Modal>
      <Loading show={isLoading} />
    </>
  );
}
