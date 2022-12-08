import StepWizard from 'react-step-wizard';
import Alert from 'react-bootstrap/Alert';

import { Modal, Loading } from 'components';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { useState } from 'react';
import { createMarmitaOrder } from 'services';
import { getCookie } from 'cookies-next';

export function Cadastro({ showModal, setShowModal }) {
  const enableModal = showModal.split(' ');
  const token = getCookie('auth.token');

  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({});
  const [isButtonDisabled, setIsButtonIsDisabled] = useState(true);

  const { mutate, isLoading, isError } = useMutation(
    (data) => createMarmitaOrder(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getAllMarmitaOrders']);
        handleCloseModal();
      },
    }
  );

  const handleCloseModal = () => {
    setShowModal('');
  };

  const handleSubmitForm = () => {
    const data = {
      clienteId: formData.cliente.id,
      delivery: true,
      produtos: formData.produtos.map((el) => {
        return {
          id: el.id,
          preco: el.preco,
          quantidade: el.quantidade,
          titulo: el.titulo,
        };
      }),
    };
    mutate(data);
  };

  return (
    <>
      <Modal
        show={!!showModal}
        setShow={handleCloseModal}
        title="Craição de Pedido"
        buttonText={enableModal[0] === 'edit' ? 'Editar' : 'Cadastrar'}
        disableButton={isButtonDisabled}
        handleButton={handleSubmitForm}
      >
        <StepWizard transitions="nothing">
          <Step1 setFormData={setFormData} />
          <Step2 setFormData={setFormData} formData={formData.produtos} />
          <Step3
            setFormData={setFormData}
            formData={formData.produtos}
            disableButton={setIsButtonIsDisabled}
          />
        </StepWizard>

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
