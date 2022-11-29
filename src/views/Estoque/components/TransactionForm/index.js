import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import api from "../../../../services";

const TransactionForm = ({ itemid, getTransactions, getItem, setShowTransactionForm }) => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = async data => {
    const updateQt = data.type === 'entry' ? data.quantidade : (0 - data.quantidade);
    const newTransaction = {
      itemid: itemid,
      quantidade: updateQt,
      usuario: 'Giovanni',
      memo: data.memo
    }

    const response = await api.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/inventory/transactions`, JSON.stringify(newTransaction), {
      headers: {
        'Content-Type': 'application/json',
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