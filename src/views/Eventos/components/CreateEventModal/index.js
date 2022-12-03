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
import { create as createEvent } from 'services/eventos';

const CreateEventModal = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (values) => {
    await createEvent(values);

    router.reload();
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>Criação de eventos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <FormLabel>Título</FormLabel>
            <FormControl required {...register('titulo', { required: true })} />
          </FormGroup>
          <Row>
            <Col>
              <FormGroup>
                <FormLabel>Data de início</FormLabel>
                <FormControl
                  type="datetime-local"
                  required
                  {...register('dataInicio', { required: true })}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel>Data de término</FormLabel>
                <FormControl
                  type="datetime-local"
                  required
                  {...register('dataTermino', { required: true })}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <FormLabel>Responsável</FormLabel>
            <FormControl required {...register('responsavel', { required: true })} />
          </FormGroup>
          <FormGroup>
            <FormLabel>Local</FormLabel>
            <FormControl required {...register('local', { required: true })} />
          </FormGroup>
          <FormGroup>
            <FormLabel>Descrição</FormLabel>
            <FormControl as="textarea" {...register('descricao')} />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Salvar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateEventModal;
