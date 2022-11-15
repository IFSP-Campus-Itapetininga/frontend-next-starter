import { Modal, Loading } from 'components';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editMarmitaOrderStatus } from 'services';

const orderStatusEnun = {
  finalized: 'completar',
  canceled: 'cancelar',
};

export function OrderModal({ showModal, setShowModal }) {
  const queryClient = useQueryClient();

  const order = showModal.split(' ');

  const { mutate, isLoading } = useMutation(editMarmitaOrderStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getActiveMarmitaOrders']);
      handleCloseModal();
    },
  });

  const handleCloseModal = () => {
    setShowModal('');
  };

  const submitOrderStatus = () => {
    const payload = {
      id: order[1],
      data: {
        status: order[0],
      },
    };
    mutate(payload);
  };

  return (
    <>
      <Modal
        show={!!showModal}
        setShow={handleCloseModal}
        title="Alterar status"
        buttonText="Salvar"
        handleButton={submitOrderStatus}
      >
        <div>
          <h5 className="card-title">
            Deseja {orderStatusEnun[order[0]]} pedido - #{order[1]}
          </h5>
        </div>
      </Modal>
      <Loading show={isLoading} />
    </>
  );
}
