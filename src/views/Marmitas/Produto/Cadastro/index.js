import { Modal, Input, Loading } from 'components';
import { useForm, FormProvider } from 'react-hook-form';

import { useMutation, useQuery } from '@tanstack/react-query';

import { createProduct } from 'services';

export function Cadastro({ showModal, setShowModal }) {
  const methods = useForm();

  const {
    data,
    isLoading: isLoadingEdit,
    isFetching,
  } = useQuery(['fetchProductInfo', /*PASSAR ID AQUI*/ 'id'], createProduct, {
    enabled: showModal === 'edit',
  });

  const { mutate, isLoading } = useMutation(createProduct, {
    onSuccess: () => {
      setShowModal('');
    },
  });

  const onSubmit = methods.handleSubmit(async (values) => {
    mutate(values);
  });

  return (
    <>
      <Modal
        show={!!showModal}
        setShow={() => setShowModal('')}
        title="Cadastro de Produto"
        buttonText="Cadastrar"
        handleButton={onSubmit}
      >
        <FormProvider {...methods}>
          <form className="py-2" onSubmit={onSubmit}>
            <div className="mb-3">
              <Input
                name="titulo"
                placeholeder="Nome do produto"
                label="Produtos"
              />
            </div>
            <div className="w-50">
              <Input
                name="preco"
                inputMode="numeric"
                placeholeder="Preço do produto"
                label="Preço"
                mask="currency"
              />
            </div>
          </form>
        </FormProvider>
      </Modal>
      <Loading show={(isLoadingEdit && isFetching) || isLoading} />
    </>
  );
}
