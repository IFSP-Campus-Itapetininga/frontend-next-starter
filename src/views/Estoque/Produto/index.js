import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Form, Button, Tabs, Tab } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ListTransactions from "../components/ListTransactions";
import api from "../../../services";
import { StockLayout } from "../layout";
import { Layout } from "layout";
import { getProduct } from "services/estoque";
import ListVendors from "../components/ListVendors";
import StockModal from "../components/StockModal";
import { getCookie } from 'cookies-next';
import { AlertModal } from "../components/AlertModal";

const Produto = () => {
  const [item, setItem] = useState({});
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [newVendor, setNewVendor] = useState(false);
  const token = getCookie('auth.token');
  const router = useRouter()
  const id = router.query.id;
  async function getItem() {
    const data = await getProduct(id);
    setItem(data);
  }
  function hideAlert() {
    setTimeout(() => {
      setShowAlertModal(false);
    }, 2000);
  }

  useEffect(() => {
    getItem();
  }, []);

  const {
    register,
    handleSubmit,
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
        'Authorization': `Bearer ${token}`
      }
    })
    if (response.status === 204) setShowAlertModal(true);
    hideAlert();
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
            <Form.Label>Descri????o</Form.Label>
            <Form.Control
              type="text"
              defaultValue={item.descricao}
              placeholder="Descri????o..."
              {...register("descricao", { required: "Descri????o do item ?? obrigat??rio" })}
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
          <Tab eventKey="transactions" title="Transa????es">
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
              <ListVendors itemid={id} setNewVendor={handleNewVendor} />
            </StockModal>
          </Tab>
        </Tabs>
      </StockLayout>
      <AlertModal title="Sucesso" text="Produto atualizado com sucesso!" showAlertModal={showAlertModal} />
    </Layout>
  )
}

export default Produto;