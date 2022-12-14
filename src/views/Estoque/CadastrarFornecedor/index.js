import { Layout } from "layout";
import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import api from '../../../services';
import { StockLayout } from "../layout";
import { getCookie } from 'cookies-next';
import { AlertModal } from "../components/AlertModal";

const CadastrarFornecedor = () => {
  const [showAlertModal, setShowAlertModal] = useState(false);
  const token = getCookie('auth.token');
  function hideAlert() {
    setTimeout(() => {
      setShowAlertModal(false);
    }, 2000);
  }
  const {
    register,
    handleSubmit,
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
    if (response.status === 201) setShowAlertModal(true);
    hideAlert();
    reset();
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
                  placeholder="Raz??o Social..."
                  {...register("fornecedor", { required: "Nome do fornecedor ?? obrigat??rio" })}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>CNPJ</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="XXX.XXX.XXX.XXX..."
                  {...register("cnpj", { required: "CNPJ do fornecedor ?? obrigat??rio" })}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Descri????o</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descri????o..."
              {...register("descricao", { required: "Descri????o do fornecedor ?? obrigat??rio" })}
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
                    {...register("rua", { required: "Logradouro ?? obrigat??rio" })}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>N??mero</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="N??..."
                    {...register("numero", { required: "N??mero ?? obrigat??rio" })}
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
                    {...register("bairro", { required: "Bairro ?? obrigat??rio" })}
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
                    {...register("cep", { required: "CEP ?? obrigat??rio" })}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Cidade</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Cidade..."
                    {...register("cidade", { required: "Cidade ?? obrigat??rio" })}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Estado..."
                    {...register("estado", { required: "Estado ?? obrigat??rio" })}
                  />
                </Form.Group>
              </Col>

            </Row>
          </Container>

          <h3 className="my-3">Contato</h3>
          <Form.Group className="mb-3">
            <Form.Label>Respons??vel</Form.Label>
            <Form.Control
              type="text"
              placeholder="Respons??vel pela empresa..."
              {...register("manager", { required: "Nome do respons??vel ?? obrigat??rio" })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cargo</Form.Label>
            <Form.Control
              type="text"
              placeholder="EX: Gerente..."
              {...register("funcao", { required: "Cargo ?? obrigat??rio" })}
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
                    {...register("email", { required: "E-mail do fornecedor ?? obrigat??rio" })}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Telefone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="(XX) XXXXX-XXXX..."
                    {...register("telefone", { required: "Telefone do fornecedor ?? obrigat??rio" })}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
          <Form.Label>Telefone ?? Whatsapp?</Form.Label>
          <div className="mb-3">
            <Form.Check
              {...register("whatsapp", { required: "Op????o obrigat??ria" })}
              name="whatsapp"
              inline
              type='radio'
              label={`Sim`}
              value={1}
            />
            <Form.Check
              {...register("whatsapp", { required: "Op????o obrigat??ria" })}
              name="whatsapp"
              inline
              type='radio'
              label={`N??o`}
              value={0}
            />
          </div>
          <Button variant="primary" type="submit">
            Cadastrar
          </Button>
        </Form>
        <AlertModal title="Sucesso" text="Fornecedor cadastrado com sucesso!" showAlertModal={showAlertModal} />
      </StockLayout>
    </Layout>
  )
}

export default CadastrarFornecedor;