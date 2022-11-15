import { Button, Form, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm, SubmitHandler } from "react-hook-form";
import api from "../../../services";
import { formatDate } from "utils";
import { Input } from "components";


const CadastrarProduto = () => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    reset,
    formState: { errors }
  } = useForm();

  async function handleFirstTransaction(id, qtd) {
    const newTransaction = {
      itemid: id,
      quantidade: qtd,
      usuario: 'Giovanni',
      memo: 'Cadastro do item'
    }

    const response = await api.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/inventory/transactions`, JSON.stringify(newTransaction), {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        alert("Item cadastrado!");
      });
  }

  const onSubmit = async data => {
    const newItem = {
      ativo: 1,
      descricao: data.descricao,
      saldo: data.saldo,
    }

    const response = await api.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/inventory/item`, JSON.stringify(newItem), {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        handleFirstTransaction(res.data.itemid, data.saldo);
        console.log(newItem, res.data)
        reset();
      }).finally(() => reset());
  };

  return (
    <Container>
      <h1 className="title">Cadastro de item</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            type="text"
            placeholder="Descrição..."
            {...register("descricao", { required: "Descrição do item é obrigatório" })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Saldo atual</Form.Label>
          <Form.Control
            type="number"
            placeholder="Saldo do item..."
            {...register("saldo", { required: "Saldo do item é obrigatório" })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Cadastrar
        </Button>
      </Form>
    </Container>
  )
}

export default CadastrarProduto;