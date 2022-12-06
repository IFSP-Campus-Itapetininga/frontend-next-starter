import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Form, Button, Container, Tabs, Tab } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ListTransactions from "../components/ListTransactions";
import api from "../../../services";
import { StockLayout } from "../layout";
import { Layout } from "layout";
import { getProduct } from "services/estoque";
import ListVendors from "../components/ListVendors";
import StockModal from "../components/StockModal";

const Produto = () => {
  const [item, setItem] = useState({});
  const [newVendor, setNewVendor] = useState(false);
  const router = useRouter()
  const id = router.query.id;
  async function getItem() {
    const data = await getProduct(id);
    setItem(data);
  }

  useEffect(() => {
    getItem();
  }, []);

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = async data => {
    const newItem = {
      ativo: 1,
      descricao: data.descricao,
    }

    const response = await api.patch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/inventory/item/${item.itemid}`, JSON.stringify(newItem), {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        alert("Item atualizado!");
      });
  };
  function handleNewVendor() {
    setNewVendor(!newVendor);
  }


  return (
    <Layout session={'Estoque'} >
      <StockLayout>
        <h1 className="title">Atualizar Produto</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              type="text"
              defaultValue={item.descricao}
              placeholder="Descrição..."
              {...register("descricao", { required: "Descrição do item é obrigatório" })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Quantidade</Form.Label>
            <Form.Control
              type="text"
              defaultValue={item.saldo}
              readOnly
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mb-3">
            Atualizar
          </Button>
        </Form>
        <Tabs
          defaultActiveKey="transactions"
          id="product-tab"
          className="mb-3"
        >
          <Tab eventKey="transactions" title="Transações">
            {item.itemid && <ListTransactions itemid={item.itemid} getItem={getItem} />}
          </Tab>
          <Tab eventKey="vendor" title="Fornecedores">
            <ListVendors justList itemid={id} />
            <Button variant="primary" onClick={handleNewVendor}>
              Adicionar fornecedor
            </Button>
            <StockModal
              show={newVendor}
              setShow={() => setNewVendor(false)}
              title="Novo contato"
            >
              <ListVendors itemid={id} setNewVendor={handleNewVendor}/>
            </StockModal>
          </Tab>
        </Tabs>
      </StockLayout>
    </Layout>
  )
}

export default Produto;