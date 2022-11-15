import { StockLayout } from "../layout";
import { Layout } from "layout";
import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import api from "../../../services";
import VendorContacts from "../components/VendorContacts";
import ContactForm from "../components/ContactForm";
import ListItems from "../components/ListItems";
import { Modal } from "components";

const Fornecedor = () => {
  const [vendor, setVendor] = useState({});
  const [newContact, setNewContact] = useState(false);
  const [newItem, setNewItem] = useState(false);
  const router = useRouter()
  const id = router.query.id;
  async function getVendor() {
    const response = await api.get(`/vendor/${id}`);
    const data = response.data;
    console.log(data);
    setVendor(data);
  }

  useEffect(() => {
    getVendor();
  }, []);


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
      fornecedor: data.fornecedor,
      descricao: data.descricao,
      endereco: {
        rua: data.rua,
        numero: data.numero,
        estado: data.estado,
        cidade: data.cidade,
        cep: data.cep,
        bairro: data.bairro,
        complemento: data.complemento
      },
      contact: [
        {
          fornecedor: data.manager,
          email: data.email,
          phone: data.phone,
          whatsapp: data.whatsapp,
          role: data.role
        }
      ]
    }

    const response = await api.post('http://localhost:3333/v1/vendor', JSON.stringify(newVendor), {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        alert("Item cadastrado!");
        reset();
      });
  };

  function handleNewContact() {
    setNewContact(!newContact);
  }

  function handleNewItem() {
    setNewItem(!newItem);
  }
  return (
    <Layout>
      <StockLayout>
        <h1 className="title mb-3">Cadastro de Fornecedor</h1>
        {(vendor.fornecedor !== undefined) &&
          <Form onSubmit={handleSubmit(onSubmit)} className="mb-5">
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={vendor.fornecedor}
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
                    defaultValue={vendor.cnpj}
                    placeholder="Razão Social..."
                    {...register("cnpj", { required: "Nome do fornecedor é obrigatório" })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                defaultValue={vendor.descricao}
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
                      defaultValue={vendor.endereco[0].rua}
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
                      defaultValue={vendor.endereco[0].numero}
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
                      defaultValue={vendor.endereco[0].bairro}
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
                      defaultValue={vendor.endereco[0].complemento}
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
                      defaultValue={vendor.endereco[0].cep}
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
                      defaultValue={vendor.endereco[0].cidade}
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
                      defaultValue={vendor.endereco[0].estado}
                      placeholder="Estado..."
                      {...register("estado", { required: "Estado é obrigatório" })}
                    />
                  </Form.Group>
                </Col>

              </Row>
            </Container>
            <Button variant="primary" type="submit">
              Atualizar
            </Button>
          </Form>}

        <Tabs
          defaultActiveKey="contacts"
          id="vendor-tab"
          className="mb-3"
        >
          <Tab eventKey="contacts" title="Contatos">
            <VendorContacts contatos={vendor.contato} />
            <Button variant={"primary"} onClick={handleNewContact} className="mb-5">
              Adicionar contato
            </Button>
            <Modal
              show={newContact}
              setShow={() => setNewContact(false)}
              title="Novo contato"
              buttonText="Fechar"
              handleButton={() => setNewContact(false)}
            >
              <ContactForm fornecedorid={id} getContacts={getVendor} setShowContactForm={() => setNewContact(false)} />
            </Modal>
          </Tab>
          <Tab eventKey="products" title="Produtos">
            <ListItems fornecedorid={id} justList />
            <Button variant={"primary"} onClick={handleNewItem} className="mb-5">
              Adicionar produto
            </Button>
            <Modal
              show={newItem}
              setShow={() => setNewItem(false)}
              title="Adicionar produto ao fornecedor"
              buttonText="Fechar"
              handleButton={() => setNewItem(false)}
            >
              <ListItems fornecedorid={id} justList={false} setNewItem={handleNewItem} />
            </Modal>
          </Tab>
        </Tabs>
      </StockLayout>
    </Layout >
  )
}

export default Fornecedor;