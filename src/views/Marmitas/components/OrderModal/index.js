import { Modal, Loading } from 'components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Alert from 'react-bootstrap/Alert';

import { editMarmitaOrderStatus } from 'services';

const orderStatusEnun = {
  finalized: 'completar',
  canceled: 'cancelar',
};

export function OrderModal({ showModal, setShowModal }) {
  const queryClient = useQueryClient();

  const order = showModal.split(' ');

  const { mutate, isLoading, isError } = useMutation(editMarmitaOrderStatus, {
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

        {isError && (
          <Alert variant="danger">
            Ocorreu um erro ao alterar status, tente novamente!
          </Alert>
        )}
      </Modal>
      <Loading show={isLoading} />
    </>
  );
}
