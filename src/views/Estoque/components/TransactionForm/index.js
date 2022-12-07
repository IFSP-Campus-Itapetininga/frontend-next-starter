import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import api from "../../../../services";
import {getCookie} from 'cookies-next';
import { useContext } from "react";
import { AuthContext } from "components/AuthProvider";

const TransactionForm = ({ itemid, getTransactions, getItem, setShowTransactionForm }) => {
  const { data } = useContext(AuthContext);
  console.log(data);
  const token = getCookie('auth.token');
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = async formData => {
    const updateQt = formData.type === 'entry' ? formData.quantidade : (0 - formData.quantidade);
    const newTransaction = {
      itemid: itemid,
      quantidade: updateQt,
      usuario: data.user.name,
      memo: formData.memo
    }

    const response = await api.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/inventory/transactions`, JSON.stringify(newTransaction), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        getItem();
        getTransactions();
        setShowTransactionForm();
        alert("Transação cadastrada!");
        reset();
      });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>Quantidade</Form.Label>
        <Form.Control
          type="number"
          {...register("quantidade", { required: "Opção obrigatória" })}
        />
      </Form.Group>
      <Form.Label>Tipo de movimentação</Form.Label>
      <div className="mb-3">
        <Form.Check
          {...register("type", { required: "Opção obrigatória" })}
          name="type"
          inline
          type='radio'
          label={`Entrada`}
          value={'entry'}
        />
        <Form.Check
          {...register("type", { required: "Opção obrigatória" })}
          name="type"
          inline
          type='radio'
          label={`Saída`}
          value={'exit'}
        />
      </div>
      <Form.Group className="mb-3">
        <Form.Label>Memorando</Form.Label>
        <Form.Control
          type="text"
          placeholder="Doação de Empresa X..."
          {...register("memo", { required: "Saldo do item é obrigatório" })}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Cadastrar
      </Button>
    </Form>
  );
}

export default TransactionForm;