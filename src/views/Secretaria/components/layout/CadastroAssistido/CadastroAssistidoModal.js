import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function CadastroAssistidoModal({textbtn, titulo, metodoCadastrarOfinca, id, nome, requesitos, propOficina, metodoAtualizaOficina}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // Oficina
  const [oficina, setOficina ] = useState(propOficina || {})


  //Pega valor dos inputs do formulário
  function handleChange(e){
    setOficina({ ...oficina, [e.target.name] : e.target.value })
    let texto =  {[e.target.name] : e.target.value}

    //console.log('oficina é ' + texto.nome + ' requesitos ' + texto.requisitos)
  }

  //criar método para atualizar oficina
  
  

  //Passa para o componente pai(TelaCrud/método cadastrarOficina) os valores de oficina.
  const enviaDados = (e) => {
    e.preventDefault()//não deixa a págian dar reload
    console.log(oficina)
    if(titulo === "Editar Oficina"){
      metodoAtualizaOficina(oficina)
    }else if(titulo === "Cadastrar Oficina"){
      metodoCadastrarOfinca(oficina)
    }
    
    setOficina({})//esvazia set oficina
    setShow(false)
  }



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
              <Form.Label>Oficina:</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                placeholder="Título da oficina"
                autoFocus
                onChange={handleChange}
                value = {oficina.nome ? oficina.nome : ''}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Requisitos:</Form.Label>
              <Form.Control 
              name="requisitos"
              as="textarea" 
              rows={3} 
              onChange={handleChange}
              value = {oficina.requisitos ? oficina.requisitos : ''}
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
