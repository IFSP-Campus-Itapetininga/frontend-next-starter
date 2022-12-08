import { Layout } from 'layout';
import { useState, useEffect } from 'react';
import api from 'services';
import {Modal, Button, Container, Form} from 'react-bootstrap'
import React from 'react';
import { useForm } from 'react-hook-form';
import { getCookie } from 'cookies-next';

import style from './Waitlist.module.scss' 

import AddForm from './components/Modals/AddForm'

export default function Waitlist() {   

  const{ register, handleSubmit } = useForm();

  const [alunoList, setAlunoList] = useState([]);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [showEdit, setShowEdit] = useState(false)
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);
  const [pegaID, setPegaID] = useState({});

  const token = getCookie('auth.token')

  async function deleteWaitlist(id){
    const escolha = window.confirm(
      'Você tem certeza que deseja excluir esse cadastro'
    )
    if (escolha) {
      await api.delete(`/waitlist/${id}`, {
        headers: {
          'authorization': `Bearer ${token}`
        }
      });
      setAlunoList(alunoList.filter(alunoList => alunoList.id !== id))
    }
  }

  async function getAllWaitlist(){ 
    const response = await api.get('/waitlist', {
      headers: {
        'authorization': `Bearer ${token}`
      }
    });
    setAlunoList(response.data)
  }

  useEffect(() => {
    getAllWaitlist()
  },[])

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
    const request = await api.put(`/waitlist/${pegaID}`, editDataList, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
    window.location.reload(true);
  }

  function handleId(id){
    setPegaID(id)
    handleShowEdit()
  }

  function calculaIdade(dateString){
    const hoje = new Date();
    const dataNasci = new Date(dateString)
    let idade = hoje.getFullYear() - dataNasci.getFullYear();
    const m = hoje.getMonth() - dataNasci.getMonth();
    return idade;
  }

  function formataData(dataFormatada){
    const data =  new Date(dataFormatada).toLocaleDateString();
    return data;
  }

  function defineAlfabetizado(define){
    if (define === 1) {
      const alfabetizado = "Sim"
      return alfabetizado
    } if (define === 0) {
      const alfabetizado = "Não"
      return alfabetizado
    }
  }

  function recarregaPagina(){
      window.location.reload(true);
  }  

  return (
    <Layout session={'Waitlist'}>
      <Container className='py-5'>

        <div className={style.content}>
          <div className={style.titulo}>
            <div>
              <h2>Gerenciamento da <b>Fila de Espera</b></h2>
            </div>
            <div>
              <Button onClick={handleShow} className={style.btn_add} data-toggle="modal">Adicionar Aluno</Button>					
            </div>
          </div>

          <table className={style.table}>
            <thead className={style.thead}>
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
            {alunoList.map((valor) => {
              return (
                <tbody>
                  <tr>
                    <td><b>{valor.nome}</b></td>
                    <td>{calculaIdade(valor.dataNascimento)}</td>
                    <td>{formataData(valor.dataCadastro)}</td>
                    <td>{defineAlfabetizado(valor.alfabetizado)}</td>
                    <td>{valor.escolaridade}</td>
                    <td>{valor.oficina}</td>
                    <td>{valor.nomeResponsavel}</td>
                    <td>{valor.telefone}</td>
                    <td className={style.separa_btn}>
                      <Button onClick={() => handleId(valor.id)} className="btn btn-warning">Editar</Button>
                      <Button onClick={() =>  deleteWaitlist(valor.id)} className="btn btn-danger">Apagar</Button>                  
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>

          <Modal className={style.modal} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className={style.titulo_modal}>
                    Cadastramento
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddForm />
            </Modal.Body>
          </Modal>
    
          <Modal className={style.modal} show={showEdit} onHide={handleCloseEdit}>
            <Modal.Header closeButton>
                <Modal.Title className={style.titulo_modal}>
                    Editar
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmit(editWaitlist)}>
              <Form.Group>
                <Form.Control className={style.form_control}
                  input="true"
                  type="text"
                  placeholder="Nome *"
                  required
                  {...register("nome")}
                />
              </Form.Group>
              <Form.Group>
                <Form.Select className={style.form_control} {...register("alfabetizado")}>
                  <option>Alfabetizado *</option>
                  <option value="1">Sim</option>
                  <option value="0">Não</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Select className={style.form_control} {...register("escolaridade")}>
                  <option>Escolaridade *</option>
                  <option value="Sem Escolaridade">Sem Escolaridade</option>
                  <option value="Ensino Fundamental I Incompleto">Ensino Fundamental I Incompleto</option>
                  <option value="Ensino Fundamental I Completo">Ensino Fundamental I Completo</option>
                  <option value="Ensino Fundamental II Incompleto">Ensino Fundamental II Incompleto</option>
                  <option value="Ensino Fundamental II Completo">Ensino Fundamental II Completo</option>
                  <option value="Ensino Médio Incompleto">Ensino Médio Incompleto</option>
                  <option value="Ensino Médio Completo">Ensino Médio Completo</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Control className={style.form_control}
                  input="true"
                  type="text"
                  placeholder="Oficina *"
                  required
                  {...register("oficina")}
                />
              </Form.Group>
              <Form.Group>
                Data de Nascimento *
                <Form.Control className={style.form_control}
                  input="true"
                  type="date"
                  placeholder="Data de Nascimento *"
                  required
                  {...register("dataNascimento")}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control className={style.form_control}
                  input="true"
                  type="text"
                  placeholder="Nome do Responsável *"
                  required
                  {...register("nomeResponsavel")}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control className={style.form_control}
                  input="true"
                  type="text"
                  placeholder="Telefone*"
                  required
                  {...register("telefone")}
                />
              </Form.Group>
              <div className={style.btn_cad}>
                <Button className="btn btn-success" type="submit" onClick={recarregaPagina}>
                  Editar
                </Button>
              </div>
            </Form>
            </Modal.Body>
          </Modal>

        </div>
      </Container>
    </Layout>
    ) 
}


