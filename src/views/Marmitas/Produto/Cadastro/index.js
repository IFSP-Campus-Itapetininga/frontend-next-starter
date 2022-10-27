import { Modal, Input, Loading } from 'components';
import { useForm, FormProvider } from 'react-hook-form';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createProduct } from 'services';
import { convertMonetaryToDecimal } from 'utils';

export function Cadastro({ showModal, setShowModal }) {
  const methods = useForm();
  const queryClient = useQueryClient();

  const { isLoading: isLoadingEdit, isFetching } = useQuery(
    ['fetchProductInfo', /*PASSAR ID AQUI*/ 'id'],
    createProduct,
    {
      enabled: showModal === 'edit',
    }
  );

  const { mutate, isLoading } = useMutation(createProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getAllProducts']);
      setShowModal('');
      methods.reset('');
    },
  });

  const onSubmit = methods.handleSubmit(async (values) => {
    const data = {
      ...values,
      preco: convertMonetaryToDecimal(values.preco),
    };
    mutate(data);
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
