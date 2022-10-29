import { Modal, Loading } from 'components';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteMarmitaProduct } from 'services';

export function DeleteProduct({ showModal, setShowModal }) {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
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
      </Modal>
      <Loading show={isLoading} />
    </>
  );
}
