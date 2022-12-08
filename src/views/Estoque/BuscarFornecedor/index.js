import { StockLayout } from "../layout";
import { Layout } from "layout";
import { useRouter } from "next/router";
import { getVendors } from "services/estoque";
import { useState } from "react";
import { Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import DeleteModal from "../components/DeleteModal";
import { useQuery } from "@tanstack/react-query";

const BuscarFornecedor = () => {

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [page, setPage] = useState(0);

  const { isLoading, error, data: vendors } = useQuery(['stockVendors'],
    () => getVendors().then(res => { return res }));

  function handleShowDeleteModal(id) {
    setSelectedItem(id);
    setShowDeleteModal(true);
  }

  if (isLoading) return "Carregando..."

  if (error) return 'Ocorreu um erro: ' + error.message;

  return (
    <Layout session="Buscar fornecedor">
      <StockLayout>
        <h1 className="title">Buscar fornecedor</h1>
        <InputGroup className="mb-3 d-flex align-items-end">
          <Form.Control
            placeholder="Procure um item..."
            aria-label="Procure um item..."
            aria-describedby="basic-addon2"
            onChange={(event) => { setSearchTerm(event.target.value) }}
          />
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
                vendors
                  .filter(vendor => vendor.ativo === '1')
                  .filter(val => {
                    if (searchTerm == "") {
                      return val;
                    } else if (val.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) || val.descricao.toLowerCase().includes(searchTerm.toLowerCase())) {
                      return val;
                    }
                  })
                  .slice(page, page + 10)
                  .map(vendor => {
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
          <div className="d-flex justify-content-between">
            <Button onClick={() => { setPage(page - 10) }} disabled={page === 0}>
              Anterior
            </Button>
            <Button onClick={() => { setPage(page + 10) }} disabled={vendors.length <= page + 10}>
              Próximo
            </Button>
          </div>
        </section>
        <DeleteModal showModal={showDeleteModal} id={selectedItem} type='vendor' setShow={() => setShowDeleteModal(false)} />
      </StockLayout>
    </Layout>
  )
}

export default BuscarFornecedor;