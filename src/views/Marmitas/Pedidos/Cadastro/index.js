import StepWizard from 'react-step-wizard';

import { Modal, Loading } from 'components';

import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { useState } from 'react';

export function Cadastro({ showModal, setShowModal }) {
  const enableModal = showModal.split(' ');
  const [formData, setFormData] = useState({});

  const handleCloseModal = () => {
    setShowModal('');
    // methods.reset('');
  };

  return (
    <>
      <Modal
        show={!!showModal}
        setShow={handleCloseModal}
        title="Cadastro de Produto"
        buttonText={enableModal[0] === 'edit' ? 'Editar' : 'Cadastrar'}
        disableButton={true}
        // handleButton={onSubmit}
      >
        <StepWizard transitions="nothing">
          <Step1 setFormData={setFormData} />
          <Step2 setFormData={setFormData} />
        </StepWizard>
      </Modal>
      <Loading show={false} />
    </>
  );
}
