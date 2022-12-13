import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { getCookie } from 'cookies-next'
import { handleAddNewContact } from "services/estoque";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ContactForm = ({ fornecedorid, setShowContactForm }) => {
  const token = getCookie('auth.token');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const queryClient = useQueryClient();

  const {
    mutate: addVendorContact,
    isLoading: isCallLoading,
    isError: isCallError,
  } = useMutation(handleAddNewContact, {
    onSuccess: () => {
      queryClient.invalidateQueries(['vendorContacts']);
      setShowContactForm(false);
    },
  });

  const onSubmit = async data => {
    const newContact = {
      fornecedorid: fornecedorid,
      nome: data.manager,
      email: data.email,
      telefone: data.telefone,
      whatsapp: data.whatsapp,
      funcao: data.funcao

    }
    addVendorContact(newContact);
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>Responsável</Form.Label>
        <Form.Control
          type="text"
          placeholder="Responsável pela empresa..."
          {...register("manager", { required: "Nome do responsável é obrigatório" })}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Cargo</Form.Label>
        <Form.Control
          type="text"
          placeholder="Responsável pela empresa..."
          {...register("funcao", { required: "Cargo é obrigatório" })}
        />
      </Form.Group>
      <Container className="m-0 p-0">
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="empresa@empresa.com..."
                {...register("email", { required: "E-mail do fornecedor é obrigatório" })}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                placeholder="(XX) XXXXX-XXXX..."
                {...register("telefone", { required: "Telefone do fornecedor é obrigatório" })}
              />
            </Form.Group>
          </Col>
        </Row>
      </Container>
      <Form.Label>Telefone é Whatsapp?</Form.Label>
      <div className="mb-3">
        <Form.Check
          {...register("whatsapp", { required: "Opção obrigatória" })}
          name="whatsapp"
          inline
          type='radio'
          label={`Sim`}
          value={1}
        />
        <Form.Check
          {...register("whatsapp", { required: "Opção obrigatória" })}
          name="whatsapp"
          inline
          type='radio'
          label={`Não`}
          value={0}
        />
      </div>
      <Button variant="primary" type="submit">
        Cadastrar
      </Button>
    </Form>
  )
}

export default ContactForm;