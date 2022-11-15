import { Container, Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm, SubmitHandler } from "react-hook-form";
import api from "../../../services";
import { useEffect, useState } from "react";
import DeleteModal from "../components/DeleteModal";
import { StockLayout } from "../layout";
import { Layout } from "layout";
import { getProducts } from "services/estoque";
import { useRouter } from "next/router";


const BuscarProduto = () => {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  async function getItems() {
    const data = await getProducts();
    console.log(data);
    setItems(data);
  }

  useEffect(() => {
    getItems();
  }, [])

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = async data => {
    console.log("Values:::", data);
    console.log("Values:::", JSON.stringify(data));
  };

  function handleShowDeleteModal(id) {
    setSelectedItem(id);
    setShowDeleteModal(true);
  }

  return (
    <Layout session="Buscar produto">
      <StockLayout>
        <h1 className="title">Buscar item</h1>
        <InputGroup className="mb-3 d-flex align-items-end">
          <Form.Control
            placeholder="Procure um item..."
            aria-label="Procure um item..."
            aria-describedby="basic-addon2"
          />
          <Button variant="outline-secondary" id="button-addon2">
            Buscar
          </Button>
        </InputGroup>
        <section>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-center">Código</th>
                <th className="text-center">Produto</th>
                <th className="text-center">Quantidade</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {
                items.filter(item => item.ativo === 1).map(item => {
                  return (
                    <tr key={item.itemid}>
                      <td className="text-center">{item.itemid}</td>
                      <td>{item.descricao}</td>
                      <td className="text-center">{Math.round(item.saldo)}</td>
                      <td>
                        <div className="text-center">
                          <Button variant="success" onClick={() => router.push(`/estoque/produto/${item.itemid}`)} style={{ "marginRight": "20px" }}>Editar</Button>
                          <Button variant="danger" onClick={() => handleShowDeleteModal(item.itemid)}>Excluir</Button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </section>
        <DeleteModal showModal={showDeleteModal} itemid={selectedItem} />
      </StockLayout>
    </Layout>
  )
}

export default BuscarProduto;