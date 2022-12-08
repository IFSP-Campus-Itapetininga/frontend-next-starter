import { Button, Form, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from "react-hook-form";
import api from "../../../services";
import { AlertModal } from "../components/AlertModal";
import { useContext, useState } from "react";
import { getCookie } from 'cookies-next'
import { AuthContext } from "components/AuthProvider";


const CadastrarProduto = () => {
  const {data} = useContext(AuthContext);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const token = getCookie('auth.token');
  function hideAlert() {
    setTimeout(() => {
      setShowAlertModal(false);
    }, 2000);
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  async function handleFirstTransaction(id, qtd) {
    const newTransaction = {
      itemid: id,
      quantidade: qtd,
      usuario: data.user.name,
      memo: 'Cadastro do item'
    }

    const response = await api.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/inventory/transactions`, JSON.stringify(newTransaction), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.status === 201) setShowAlertModal(true);
    hideAlert();
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
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        handleFirstTransaction(res.data.itemid, data.saldo);
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
      <AlertModal title="Sucesso" text="Produto cadastrado com sucesso!" showAlertModal={showAlertModal} />
    </Container>
  )
}

export default CadastrarProduto;