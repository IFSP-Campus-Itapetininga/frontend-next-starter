import { Modal, Input, Loading, ButtonIcon } from 'components';
import { useForm, FormProvider } from 'react-hook-form';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createMarmitaProduct,
  getMarmitaProduct,
  editMarmitaProduct,
} from 'services';
import { convertMonetaryToDecimal, convertMonetary } from 'utils';

import { yupResolver } from '@hookform/resolvers/yup';

import schema from './validation';

export function Cadastro({ showModal, setShowModal }) {
  const methods = useForm({ resolver: yupResolver(schema) });
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
            <div className="mb-3 d-flex align-items-end gap-3 w-100">
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
          </form>
        </FormProvider>
      </Modal>
      <Loading
        show={(isLoadingEdit && isFetching) || isLoading || isEditLoading}
      />
    </>
  );
}
