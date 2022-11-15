import { StockLayout } from "../layout";
import { Layout } from "layout";
import { useRouter } from "next/router";
import { getVendors } from "services/estoque";
import { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import DeleteModal from "../components/DeleteModal";

const BuscarFornecedor = () => {

  const router = useRouter();
  const [vendors, setVendors] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  async function getData() {
    const data = await getVendors();
    setVendors(data);
  }

  useEffect(() => {
    getData();
  }, [])

  function handleShowDeleteModal(id) {
    setSelectedItem(id);
    setShowDeleteModal(true);
  }

  return (
    <Layout session="Buscar fornecedor">
      <StockLayout>
        <h1 className="title">Buscar fornecedor</h1>
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
                <th className="text-center">Fornecedor</th>
                <th className="text-center">Descrição</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {
                vendors.map(vendor => {
                  return (
                    <tr key={vendor.fornecedorid}>
                      <td className="text-center">{vendor.fornecedorid}</td>
                      <td>{vendor.fornecedor}</td>
                      <td>{vendor.descricao}</td>
                      <td>
                        <div className="text-center">
                          <Button variant="success" onClick={() => router.push(`/estoque/fornecedor/${vendor.fornecedorid}`)} style={{ "marginRight": "20px" }}>Editar</Button>
                          <Button variant="danger" onClick={() => handleShowDeleteModal(vendor.fornecedorid)}>Excluir</Button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </section>
        <DeleteModal showModal={showDeleteModal} iditem={selectedItem} />
      </StockLayout>
    </Layout>
  )
}

export default BuscarFornecedor;