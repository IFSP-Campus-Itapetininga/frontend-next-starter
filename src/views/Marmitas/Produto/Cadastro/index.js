import { Modal, Input, Loading } from 'components';
import { useForm, FormProvider } from 'react-hook-form';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createMarmitaProduct,
  getMarmitaProduct,
  editMarmitaProduct,
} from 'services';
import { convertMonetaryToDecimal, convertMonetary } from 'utils';

export function Cadastro({ showModal, setShowModal }) {
  const methods = useForm();
  const queryClient = useQueryClient();
  const enableModal = showModal.split(' ');

  const { isLoading: isLoadingEdit, isFetching } = useQuery(
    ['fetchProductInfo', enableModal[1]],
    () => getMarmitaProduct(enableModal[1]),
    {
      enabled: enableModal[0] === 'edit',
      onSuccess: (data) => {
        methods.setValue('titulo', data.titulo);
        methods.setValue('preco', convertMonetary(data.preco, 'decimal'));
      },
    }
  );

  const { mutate: createMamita, isLoading } = useMutation(
    createMarmitaProduct,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getAllMarmitaProducts']);
        handleCloseModal();
      },
    }
  );

  const { mutate: editMamita, isLoading: isEditLoading } = useMutation(
    editMarmitaProduct,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getAllMarmitaProducts']);
        handleCloseModal();
      },
    }
  );

  const onSubmit = methods.handleSubmit(async (values) => {
    const data = {
      ...values,
      preco: convertMonetaryToDecimal(values.preco),
    };

    if (enableModal[0] === 'edit') {
      editMamita({ id: enableModal[1], data });
      return;
    }

    createMamita(data);
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
      <Loading
        show={(isLoadingEdit && isFetching) || isLoading || isEditLoading}
      />
    </>
  );
}
