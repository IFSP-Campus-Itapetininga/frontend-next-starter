import { Layout } from 'layout';
import { useState, useEffect } from 'react';
import api from 'services';
import {Form, Modal, Button, Container} from 'react-bootstrap'
import { useForm } from 'react-hook-form';

import style from './Waitlist.module.scss' 

export default function Waitlist() { 
  const{ register, handleSubmit } = useForm();
  
  const [alunoList, setAlunoList] = useState([]);

  const [show, setShow] = useState(false);
  const [pegaID, setPegaID] = useState({});
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [showEdit, setShowEdit] = useState(false)
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);

  const createWaitlist = async data => {
    const dataList = {
      id: data.id,
      nome: data.nome,
      alfabetizado: data.alfabetizado,
      escolaridade: data.escolaridade,
      oficina: data.oficina,
      dataCadastro: data.dataCadastro,
      dataNascimento: data.dataNascimento,
      nomeResponsavel: data.nomeResponsavel,
      telefone: data.telefone
    }
    const request = await api.post('/waitlist', dataList)
  }

  const editWaitlist = async data => {
    const editDataList = {
      nome: data.nome,
      alfabetizado: data.alfabetizado,
      escolaridade: data.escolaridade,
      oficina: data.oficina,
      dataNascimento: data.dataNascimento,
      nomeResponsavel: data.nomeResponsavel,
      telefone: data.telefone
    }
    console.log(editDataList)
    const request = await api.put(`/waitlist/${pegaID}`, editDataList)
  }

  async function deleteWaitlist(id){
    await api.delete(`/waitlist/${id}`);
    setAlunoList(alunoList.filter(alunoList => alunoList.id !== id))
    console.log(id)
  }

  async function getAllWaitlist(){ 
    const response = await api.get('/waitlist');
    setAlunoList(response.data)
  }

  useEffect(() => {
    getAllWaitlist()
  },[])

  function calculaIdade(dateString){
    const hoje = new Date();
    const dataNasci = new Date(dateString)
    let idade = hoje.getFullYear() - dataNasci.getFullYear();
    const m = hoje.getMonth() - dataNasci.getMonth();
    return idade;
  }

  function handleId(id){
    setPegaID(id)
    handleShowEdit()
  }

  return (
    <Layout session={'Waitlist'}>
      <Container className='py-5'>

        <div style={style.content}>
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">
                <h2>Gerenciamento da <b>Fila de Espera</b></h2>
              </div>
              <div className="col-sm-6">
                <Button onClick={handleShow} className="btn btn-success" data-toggle="modal">Adicionar Aluno</Button>					
              </div>
            </div>
          </div>

          <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>Data de Cadastro</th>
                    <th>Alfabetizado</th>
                    <th>Escolaridade</th>
                    <th>Oficina</th>
                    <th>Nome do responsável</th>
                    <th>Telefone</th>
                    <th>Ações</th>
                </tr>
            </thead>
            {alunoList.map((valor, chave) => {
              return (
                <tbody>
                  <tr>
                    <td><b>{valor.nome}</b></td>
                    <td>{calculaIdade(valor.dataNascimento)}</td>
                    <td>{valor.dataCadastro}</td>
                    <td>{valor.alfabetizado}</td>
                    <td>{valor.escolaridade}</td>
                    <td>{valor.oficina}</td>
                    <td>{valor.nomeResponsavel}</td>
                    <td>{valor.telefone}</td>
                    <td>
                      <button onClick={() => handleId(valor.id)} className="edit" id="update" data-toggle="modal">Edit</button>
                      <button onClick={() => deleteWaitlist(valor.id)} className="btn text-danger btn act" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></button>                  
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Cadastramento
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit(createWaitlist)}>
                <Form.Group>s
                  <Form.Control 
                    input="true"
                    type="text"
                    placeholder="Nome *"
                    required
                    {...register("nome")}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control 
                      input="true"
                      type="text"
                      placeholder="Alfabetizado *"
                      required
                      {...register("alfabetizado")}
                    />
                </Form.Group>
                <Form.Group>
                  <Form.Control 
                    input="true"
                    type="text"
                    placeholder="Escolaridade *"
                    required
                    {...register("escolaridade")}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control 
                    input="true"
                    type="text"
                    placeholder="Oficina *"
                    required
                    {...register("oficina")}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control 
                    input="true"
                    type="date"
                    placeholder="Data de Nascimento *"
                    required
                    {...register("dataNascimento")}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control 
                    input="true"
                    type="text"
                    placeholder="Nome do Responsável *"
                    required
                    {...register("nomeResponsavel")}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control 
                    input="true"
                    type="text"
                    placeholder="Telefone*"
                    required
                    {...register("telefone")}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control 
                    input="true"
                    type="text"
                    value={new Date().toLocaleDateString()}
                    readOnly
                  />
                </Form.Group>
                <button type="submit">
                  Cadastrar
                </button>
              </Form>
            </Modal.Body>
          </Modal>
      
          
          <Modal show={showEdit} onHide={handleCloseEdit}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Editar
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit(editWaitlist)}>
                <Form.Group>
                  <Form.Control 
                    input="true"
                    type="text"
                    placeholder="Nome *"
                    required
                    {...register("nome")}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control 
                      input="true"
                      type="text"
                      placeholder="Alfabetizado *"
                      required
                      {...register("alfabetizado")}
                    />
                </Form.Group>
                <Form.Group>
                  <Form.Control 
                    input="true"
                    type="text"
                    placeholder="Escolaridade *"
                    required
                    {...register("escolaridade")}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control 
                    input="true"
                    type="text"
                    placeholder="Oficina *"
                    required
                    {...register("oficina")}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control 
                    input="true"
                    type="date"
                    placeholder="Data de Nascimento *"
                    required
                    {...register("dataNascimento")}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control 
                    input="true"
                    type="text"
                    placeholder="Nome do Responsável *"
                    required
                    {...register("nomeResponsavel")}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control 
                    input="true"
                    type="text"
                    placeholder="Telefone*"
                    required
                    {...register("telefone")}
                  />
                </Form.Group>
                <button type="submit">
                  Editar
                </button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </Container>
    </Layout>
    ) 
}