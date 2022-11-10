import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select'
import makeAnimated from "react-select/animated";

//CSS
import styles from './CadastroTurmaModal.module.scss'

function CadastroTurmaModal({ textbtn, titulo, metodoCadastraDados, propsDados, metodoAtualizaDados }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const animatedComponents = makeAnimated();//Select Animated

  // dados locais
  const [dadosLocal, setDadosLocal] = useState(propsDados || {})

  // dados locais
  const [options, setOptions] = useState([] || '')

  // oficina
  const [oficina, setOficina] = useState({})
  //Pega valor dos inputs do formulário
  function handleChange(e) {
    setDadosLocal({ ...dadosLocal, [e.target.name]: e.target.value })
    let texto = { [e.target.name]: e.target.value }
    
    console.log(options)
  }

  //Passa para o componente pai(TelaCrud/método cadastrarOficina) os valores de oficina.
  const enviaDados = (e) => {
    e.preventDefault()//não deixa a págian dar reload
    console.log(dadosLocal)
    if (titulo === `Editar Dados`) {
      metodoAtualizaDados(dadosLocal)
    } else if (titulo === "Cadastrar Dados") {
      metodoCadastraDados(dadosLocal)
    }
    setDadosLocal({})//esvazia set oficineiro
    setShow(false)
  }
/*
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  */

 



//Carrega assistido / aluno
useEffect(() => {
    
  fetch('http://localhost:5000/assistido', {
    
      method: 'GET',
      headers:{
          'Content-Type': 'application/json'
      },
  })
  .then((resp) => resp.json())
  .then((data) => {
    let option = []
    
    data.forEach((dado)=> {
        option = [...option,  {value : dado.id, label : ' ' + dado.id + ' | ' +  dado.cpf + ' | ' + dado.nome}]
        
      })
     // console.log(option)
      setOptions(option)
    })
  
  .catch((err) => console.log(err))
},[])

  //Pega valor dos selection do formulário
  function handleCategory(e) {    
    setDadosLocal({ ...dadosLocal, oficina:e} )    
    //console.log(dadosLocal)
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
              <Form.Label>Oficina:</Form.Label>
              <Select
                defaultValue={dadosLocal.oficina ? dadosLocal.oficina : ''}
                components={animatedComponents}
                isMulti
                options={options}
                onChange={(item) => handleCategory(item)}
                className="select"
                isClearable={true}
                isSearchable={true}
                isDisabled={false}
                isLoading={false}
                isRtl={false}
                closeMenuOnSelect={false}
              />
              
                
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
              <Form.Label>Oficineiro:</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Escolha um oficineiro...</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className={styles.containerHorario} controlId="exampleForm.ControlInput1" >
              <Form.Label>Horário: </Form.Label>
              <Form.Control
                className={styles.time}
                type="time"
                name="horarioInicio"
                placeholder="horário que ocorre a oficina."
                autoFocus
                onChange={handleChange}
              />

              <Form.Control
                className={styles.time}
                type="time"
                name="horarioFim"
                placeholder="horário que ocorre a oficina."
                autoFocus
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className={styles.containerHorario} controlId="exampleForm.ControlInput1" >
              <Form.Label>Vagas:</Form.Label>
              <Form.Control
                className={styles.vagas}
                type="number"
                name="lotacao"
                placeholder="20"
                autoFocus
                onChange={handleChange}
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

export default CadastroTurmaModal
