import { Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { StockLayout } from "../layout";
import { Layout } from "layout";
import { getAllTransactions } from "services/estoque";
import { parseISO, format } from 'date-fns';

const formatDateToBrazilianStandard = (_date) => {
  const date = parseISO(_date.split('.')[0]);
  return format(date, "dd'/'MM'/'yyyy HH':'mm");
};



const MovimentacoesEstoque = () => {
  const [transactions, setTransactions] = useState([]);
  async function getTransactions() {
    const data = await getAllTransactions();
    setTransactions(data.transactions);
  }

  function printReport() {
    const printContent = document.getElementById("printableArea").innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;

    window.print();

    document.body.innerHTML = originalContent;
  }

  useEffect(() => {
    getTransactions();
  }, [])

  return (
    <Layout session="Buscar produto">
      <StockLayout>
        <h1 className="mb-3">Relatório de movimentações</h1>
        <section id="printableArea">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-center">Código</th>
                <th className="text-center">Produto</th>
                <th className="text-center">Quantidade</th>
                <th className="text-center">Data da Transação</th>
                <th className="text-center">Usuário</th>
                <th className="text-center">Memorando</th>
              </tr>
            </thead>
            <tbody>
              {
                transactions
                  .map(transaction => {
                    return (
                      <tr key={transaction.transacaoid}>
                        <td className="text-center">{transaction.transacaoid}</td>
                        <td>{transaction.descricao}</td>
                        <td className={`${(transaction.quantidade >= 0 ? 'text-success' : 'text-danger')} text-center`}>{Math.round(transaction.quantidade)}</td>
                        <td className="text-center">{formatDateToBrazilianStandard(transaction.datatransacao)}</td>
                        <td>{transaction.usuario}</td>
                        <td>{transaction.memo}</td>
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

export default MovimentacoesEstoque;