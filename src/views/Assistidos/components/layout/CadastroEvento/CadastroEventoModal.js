import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function CadastroAssistidoModal({textbtn, titulo, metodoCadastraDados, propsDados, metodoAtualizaDados}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // dados locais
  const [dadosLocal, setDadosLocal] = useState(propsDados || {})

  //Pega valor dos inputs do formulário
  function handleChange(e){
    setDadosLocal({ ...dadosLocal, [e.target.name] : e.target.value })
    let texto =  {[e.target.name] : e.target.value}
  } 

  //Passa para o componente pai(TelaCrud/método cadastrarOficina) os valores de oficina.
  const enviaDados = (e) => {
    e.preventDefault()//não deixa a págian dar reload
    console.log(dadosLocal)
    if(titulo === `Editar Dados`){
      metodoAtualizaDados(dadosLocal)
    }else if(titulo === "Cadastrar Dados"){
      metodoCadastraDados(dadosLocal)
    }    
    setDadosLocal({})//esvazia set oficineiro
    setShow(false)
  }

  //Render
  return (
    <>
      <Button variant="btn btn-outline-primary" onClick={handleShow}>
        {textbtn}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
              <Form.Label>Nome:</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                placeholder="Nome do(a) assistido(a) "
                autoFocus
                onChange={handleChange}
                value = {dadosLocal.nome ? dadosLocal.nome : ''}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
              <Form.Label>CPF:</Form.Label>
              <Form.Control
                type="text"
                name="cpf"
                placeholder="000.000.000-00"
                onChange={handleChange}
                value = {dadosLocal.cpf ? dadosLocal.cpf : ''}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
              <Form.Label>Data de Nascimento:</Form.Label>
              <Form.Control
                type="date"
                name="nascimento"
                placeholder="00/00/0000"
                onChange={handleChange}
                value = {dadosLocal.nascimento ? dadosLocal.nascimento : ''}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
              <Form.Label>E-mail:</Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder="usuario@dominio.com"
                onChange={handleChange}
                value = {dadosLocal.email ? dadosLocal.email : ''}
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={enviaDados}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CadastroAssistidoModal
