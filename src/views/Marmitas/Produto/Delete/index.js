import { Modal, Loading } from 'components';
import Alert from 'react-bootstrap/Alert';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteMarmitaProduct } from 'services';

export function DeleteProduct({ showModal, setShowModal }) {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation(
    () => deleteMarmitaProduct(showModal),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getAllMarmitaProducts']);
        handleCloseModal();
      },
    }
  );

  const handleCloseModal = () => {
    setShowModal('');
  };

  return (
    <>
      <Modal
        show={!!showModal}
        setShow={handleCloseModal}
        title="Remover produto"
        buttonText={'Remover'}
        btnVariant="danger"
        handleButton={() => mutate(showModal)}
      >
        <p>
          Atenção tem certeza que deseja remover o produto{' '}
          <strong>#{showModal}</strong>?
        </p>

        {isError && (
          <Alert variant="danger" className="mt-4">
            Ocorreu um erro ao criar pedido, tente novamente!
          </Alert>
        )}
      </Modal>
      <Loading show={isLoading} />
    </>
  );
}
