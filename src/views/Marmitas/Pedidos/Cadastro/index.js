import StepWizard from 'react-step-wizard';

import { Modal, Loading } from 'components';
import { useMutation } from '@tanstack/react-query';

import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { useState } from 'react';
import { createMarmitaOrder } from 'services';

export function Cadastro({ showModal, setShowModal }) {
  const enableModal = showModal.split(' ');
  const [formData, setFormData] = useState({});
  const [isButtonDisabled, setIsButtonIsDisabled] = useState(true);

  const { mutate, isLoading } = useMutation(createMarmitaOrder, {
    onSuccess: () => {
      handleCloseModal();
    },
  });

  const handleCloseModal = () => {
    setShowModal('');
    // methods.reset('');
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
      </Modal>
      <Loading show={false} />
    </>
  );
}
