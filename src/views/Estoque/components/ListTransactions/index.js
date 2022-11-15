import { Modal } from "components";
import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import api from "../../../../services";
import TransactionForm from "../TransactionForm";



const ListTransactions = ({ itemid, getItem }) => {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState(false);
  async function getTransactions() {
    const response = await api.get(`inventory/transactions/${itemid}`);
    const data = response.data;
    setTransactions(data.transacoes);
  }

  useEffect(() => {
    getTransactions();
  }, []);

  function handleNewTransaction() {
    setNewTransaction(!newTransaction);
  }


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
                      <td className="text-center">{item.datatransacao}</td>
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
      <Modal
        show={newTransaction}
        setShow={() => setNewTransaction(false)}
        title="Nova transação"
        buttonText="Fechar"
        handleButton={() => setNewTransaction(false)}
      >
        <TransactionForm itemid={itemid} getTransactions={getTransactions} getItem={getItem} setShowTransactionForm={() => setNewTransaction(false)} />
      </Modal>
    </>

  )
}

export default ListTransactions;