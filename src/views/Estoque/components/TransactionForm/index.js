import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "components/AuthProvider";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { handleNewTransaction } from "services/estoque";

const TransactionForm = ({ itemid, getItem, setShowTransactionForm }) => {
  const { data } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    watch,
    formState: { errors }
  } = useForm();

  const {
    mutate: createTransaction,
    isLoading,
    isError,
  } = useMutation(handleNewTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries(['stockItemTransactions']);
      getItem();
      setShowTransactionForm(); 
      reset();
    },
  });

  const onSubmit = async formData => {
    const updateQt = formData.type === 'entry' ? formData.quantidade : (0 - formData.quantidade);
    const newTransaction = {
      itemid: itemid,
      quantidade: updateQt,
      usuario: data.user.name,
      memo: formData.memo
    }
    createTransaction(newTransaction);
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