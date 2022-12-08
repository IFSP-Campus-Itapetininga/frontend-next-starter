
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { getTransactions } from "services/estoque";
import { parseISO, format } from 'date-fns';
import StockModal from "../StockModal";
import TransactionForm from "../TransactionForm";


const formatDateToBrazilianStandard = (_date) => {
  const date = parseISO(_date.split('.')[0]);
  return format(date, "dd'/'MM'/'yyyy HH':'mm");
};


const ListTransactions = ({ itemid, getItem }) => {
  const [newTransaction, setNewTransaction] = useState(false);
  const { isLoading, error, data: transactions } = useQuery(['stockItemTransactions'],
    () => getTransactions(itemid).then(res => { return res }));

  function handleNewTransaction() {
    setNewTransaction(!newTransaction);
  }

  if (isLoading) return "Loading..."

  if (error) return 'Ocorreu um erro: ' + error.message;

  return (
    <>
      {
        transactions.length === 0 ?
          <p>Nenhuma Transação cadastrada!</p> :
          <Table striped bordered hover>
            < thead >
              <tr>
                <th className="text-center">Usuário</th>
                <th className="text-center">Quantidade</th>
                <th className="text-center">Memorando</th>
                <th className="text-center">Data da Transação</th>
              </tr>
            </thead >
            <tbody>
              {
                transactions.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.usuario}</td>
                      <td className={`${(item.quantidade >= 0 ? 'text-success' : 'text-danger')} text-center`}>{item.quantidade}</td>
                      <td>{item.memo}</td>
                      <td className="text-center">{formatDateToBrazilianStandard(item.datatransacao)}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table >
      }
      <Button variant={"primary"} type="submit" onClick={handleNewTransaction} className="my-3">
        Nova transação
      </Button>
      <StockModal
        show={newTransaction}
        setShow={() => setNewTransaction(false)}
        title="Nova transação"
      >
        <TransactionForm itemid={itemid} getTransactions={getTransactions} getItem={getItem} setShowTransactionForm={() => setNewTransaction(false)} />
      </StockModal>
    </>

  )
}

export default ListTransactions;