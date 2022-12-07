import { Layout } from "layout";
import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import api from '../../../services';
import { StockLayout } from "../layout";
import {getCookie} from 'cookies-next';

const CadastrarFornecedor = () => {
  const [newContact, setNewContact] = useState(false);
  const token = getCookie('auth.token');

  function handleNewContact() {
    setNewContact(!newContact);
  }

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async data => {
    const newVendor = {
      ativo: 1,
      fornecedor: data.fornecedor,
      descricao: data.descricao,
      cnpj: data.cnpj,
      endereco: {
        rua: data.rua,
        numero: data.numero,
        estado: data.estado,
        cidade: data.cidade,
        cep: data.cep,
        bairro: data.bairro,
        complemento: data.complemento
      },
      contato: [
        {
          nome: data.manager,
          email: data.email,
          telefone: data.telefone,
          whatsapp: data.whatsapp,
          funcao: data.funcao
        }
      ]
    }

    const response = await api.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/vendor`, JSON.stringify(newVendor), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        alert("Fornecedor cadastrado!");
        reset();
      });
  };

  return (
    <Layout session="Cadastrar fornecedor">
      <StockLayout>
        <h1 className="title mb-3">Cadastro de Fornecedor</h1>
        <Form onSubmit={handleSubmit(onSubmit)} className="mb-5">
          <Row>
            <Col xs={7}>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Razão Social..."
                  {...register("fornecedor", { required: "Nome do fornecedor é obrigatório" })}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>CNPJ</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="XXX.XXX.XXX.XXX..."
                  {...register("cnpj", { required: "CNPJ do fornecedor é obrigatório" })}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descrição..."
              {...register("descricao", { required: "Descrição do fornecedor é obrigatório" })}
            />
          </Form.Group>
          <Container className="m-0 p-0">
            <Row>
              <Col xs={10}>
                <Form.Group className="mb-3">
                  <Form.Label>Logradouro</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Rua..."
                    {...register("rua", { required: "Logradouro é obrigatório" })}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Número</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nº..."
                    {...register("numero", { required: "Número é obrigatório" })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Bairro</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Bairro..."
                    {...register("bairro", { required: "Bairro é obrigatório" })}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Complemento</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Complemento..."
                    {...register("complemento")}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>CEP</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="XXXXX-XXX"
                    {...register("cep", { required: "CEP é obrigatório" })}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Cidade</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Cidade..."
                    {...register("cidade", { required: "Cidade é obrigatório" })}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Estado..."
                    {...register("estado", { required: "Estado é obrigatório" })}
                  />
                </Form.Group>
              </Col>

            </Row>
          </Container>

          <h3 className="my-3">Contato</h3>
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
              placeholder="EX: Gerente..."
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
      </StockLayout>
    </Layout>
  )
}

export default CadastrarFornecedor;