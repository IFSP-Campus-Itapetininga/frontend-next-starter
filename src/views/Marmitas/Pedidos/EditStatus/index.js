import { Modal, Loading, Select } from 'components';
import { useForm, FormProvider } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editMarmitaOrderStatus } from 'services';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './validation';

export function EditStatus({ showModal, setShowModal }) {
  const methods = useForm({ resolver: yupResolver(schema) });
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(editMarmitaOrderStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getAllMarmitaOrders']);
      handleCloseModal();
    },
  });

  const handleCloseModal = () => {
    setShowModal('');
    methods.reset('');
  };

  const onSubmit = methods.handleSubmit(async ({ status }) => {
    const payload = {
      id: showModal,
      data: {
        status: status.value,
      },
    };

    mutate(payload);
  });

  return (
    <>
      <Modal
        show={!!showModal}
        setShow={handleCloseModal}
        title="Alterar status"
        buttonText="Salvar"
        handleButton={onSubmit}
      >
        <div>
          <h5 className="card-title">
            Alterar status do pedido número - #{showModal}
          </h5>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <Select
              name="status"
              placeholder="Selecione um status"
              options={[
                { value: 'finalized', label: 'Completo' },
                { value: 'canceled', label: 'Cancelado' },
              ]}
            />
          </form>
        </FormProvider>
      </Modal>
      <Loading show={isLoading} />
    </>
  );
}
