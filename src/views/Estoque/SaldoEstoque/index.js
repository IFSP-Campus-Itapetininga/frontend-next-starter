import { Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { StockLayout } from "../layout";
import { Layout } from "layout";
import { getProducts } from "services/estoque";


const SaldoEstoque = () => {
  const [items, setItems] = useState([]);
  async function getItems() {
    const data = await getProducts();
    setItems(data);
  }

  function printReport() {
    const printContent = document.getElementById("printableArea").innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;

    window.print();

    document.body.innerHTML = originalContent;
  }

  useEffect(() => {
    getItems();
  }, [])
  return (
    <Layout session="Buscar produto">
      <StockLayout>
        <h1 className="title mb-5">Saldo do estoque</h1>
        <section id="printableArea">
          <Table striped bordered hover >
            <thead>
              <tr>
                <th className="text-center">Código</th>
                <th className="text-center">Produto</th>
                <th className="text-center">Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {
                items
                  .filter(item => item.ativo === 1)
                  .map(item => {
                    return (
                      <tr key={item.itemid}>
                        <td className="text-center">{item.itemid}</td>
                        <td>{item.descricao}</td>
                        <td className="text-center">{Math.round(item.saldo)}</td>
                      </tr>
                    )
                  })
              }
            </tbody>
          </Table>
        </section>
        <Button onClick={printReport}>
          Imprimir
        </Button>
      </StockLayout>
    </Layout>
  )
}

export default SaldoEstoque;