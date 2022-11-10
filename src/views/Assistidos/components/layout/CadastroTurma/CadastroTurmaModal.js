import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Select from './Select'

//CSS
import styles from './CadastroTurmaModal.module.scss'

function CadastroTurmaModal({ textbtn, titulo, metodoCadastraDados, propsDados, metodoAtualizaDados }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // dados locais
  const [dadosLocal, setDadosLocal] = useState(propsDados || {})

  // oficina
  const [oficina, setOficina] = useState([])

  //Pega valor dos inputs do formulário
  function handleChange(e) {
    setDadosLocal({ ...dadosLocal, [e.target.name]: e.target.value })
    let texto = { [e.target.name]: e.target.value }
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

  //Carrega Oficina
  useEffect(() => {
    fetch('http://localhost:5000/projetos', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        },
    })
    .then((resp) => resp.json())
    .then((data) => {
      setOficina(data),
      console.log(data)
    })
    .catch((err) => console.log(err))
},[])

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
                propsDados={oficina}

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
