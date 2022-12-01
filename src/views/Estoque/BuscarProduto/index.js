import { Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import DeleteModal from "../components/DeleteModal";
import { StockLayout } from "../layout";
import { Layout } from "layout";
import { getProducts } from "services/estoque";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";


const BuscarProduto = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [page, setPage] = useState(0);


  const { isLoading, error, data: items } = useQuery(['stockItems'],
    () => getProducts().then(res => {return res}));


  function handleShowDeleteModal(id) {
    setSelectedItem(id);
    setShowDeleteModal(true);
  }

  if (isLoading) return "Loading..."

  if (error) return 'Ocorreu um erro: ' + error.message;

  return (
    <Layout session="Buscar produto">
      <StockLayout>
        <h1 className="title">Buscar item</h1>
        <InputGroup className="mb-3 d-flex align-items-end">
          <Form.Control
            placeholder="Procure um item..."
            aria-label="Procure um item..."
            aria-describedby="basic-addon2"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
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
                items
                  .filter(item => item.ativo === 1)
                  .filter(val => {
                    if (searchTerm == "") {
                      return val;
                    } else if (val.descricao.toLowerCase().includes(searchTerm.toLowerCase())) {
                      return val;
                    }
                  })
                  .slice(page, page + 10)
                  .map(item => {
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
          <div className="d-flex justify-content-between">
            <Button onClick={() => { setPage(page - 10) }} disabled={page === 0}>
              Anterior
            </Button>
            <Button onClick={() => { setPage(page + 10) }} disabled={items.length <= page + 10}>
              Próximo
            </Button>
          </div>
        </section>
        <DeleteModal showModal={showDeleteModal} itemid={selectedItem} />
      </StockLayout>
    </Layout>
  )
}

export default BuscarProduto;