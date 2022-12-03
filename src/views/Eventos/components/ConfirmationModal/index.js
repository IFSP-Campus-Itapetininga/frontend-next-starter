import { Input } from 'components';
import { useRouter } from 'next/router';
import {
  Form,
  FormLabel,
  FormControl,
  FormGroup,
  Row,
  Modal,
  Col,
  Button,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { destroy as destroyEvent } from 'services/eventos';

const ConfirmationModal = ({ isOpen, onClose, eventId }) => {
  const router = useRouter();

  const handleConfirmation = async () => {
    await destroyEvent(eventId);

    router.reload();
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmação</Modal.Title>
      </Modal.Header>
      <Modal.Body>Deseja continuar?</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleConfirmation}>
          Continuar
        </Button>
        <Button variant="error" onClick={() => onClose()}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
