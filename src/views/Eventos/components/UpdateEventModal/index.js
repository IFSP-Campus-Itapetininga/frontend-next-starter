import 'date-fns/locale/pt-BR';
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
import { update as updateEvent } from 'services/eventos';
import { parseISO, format } from 'date-fns';

const UpdateEventModal = ({ isOpen, onClose, data }) => {
  const { id, titulo, responsavel, local, dataInicio, dataTermino, descricao } = data;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (values) => {
    await updateEvent(data.id, values);

    router.reload();
  };

  const getDatetimeLocalFormat = (_date) => {
    const date = format(parseISO(_date.split('.')[0]), "yyyy-MM-dd'T'HH:mm:ss");

    return date;
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>Atualização de evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <FormLabel>Título</FormLabel>
            <FormControl
              defaultValue={titulo}
              required
              {...register('titulo', { required: true })}
            />
          </FormGroup>
          <Row>
            <Col>
              <FormGroup>
                <FormLabel>Data de início</FormLabel>
                <FormControl
                  defaultValue={getDatetimeLocalFormat(dataInicio)}
                  required
                  type="datetime-local"
                  {...register('dataInicio', { required: true })}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel>Data de término</FormLabel>
                <FormControl
                  defaultValue={getDatetimeLocalFormat(dataTermino)}
                  type="datetime-local"
                  required
                  {...register('dataTermino', { required: true })}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <FormLabel>Responsável</FormLabel>
            <FormControl
              defaultValue={responsavel}
              required
              {...register('responsavel', { required: true })}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Local</FormLabel>
            <FormControl
              defaultValue={local}
              required
              {...register('local', { required: true })}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Descrição</FormLabel>
            <FormControl
              defaultValue={descricao}
              as="textarea"
              {...register('descricao')}
            />
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

export default UpdateEventModal;
