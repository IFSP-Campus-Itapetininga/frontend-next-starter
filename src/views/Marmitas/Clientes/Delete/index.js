import { Modal, Loading } from 'components';
import Alert from 'react-bootstrap/Alert';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteMarmitaClient } from 'services';

export function DeleteProduct({ showModal, setShowModal }) {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation(
    () => deleteMarmitaClient(showModal),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getAllMarmitaClients']);
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
          <Alert variant="danger">
            Ocorreu um erro ao excluir cliente, tente novamente!
          </Alert>
        )}
      </Modal>
      <Loading show={isLoading} />
    </>
  );
}
