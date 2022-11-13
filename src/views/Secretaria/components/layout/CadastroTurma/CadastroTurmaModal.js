import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import SelectOficinas from './SelectOficinas'
import Select from './Select'

//CSS
import styles from './CadastroTurmaModal.module.scss'

function CadastroTurmaModal({ textbtn, titulo, metodoCadastraDados, propsDados, metodoAtualizaDados }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // dados locais
  const [dadosLocal, setDadosLocal] = useState(propsDados || {})

  // oficineiros select
  const [oficineiros, setOficineiros] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/oficineiro', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setOficineiros(data)
        //console.log(data)
      })
      .catch((err) => console.log(err))
  }, [])

  // oficina select
  const [oficina, setOficina] = useState([])
  //Carrega Select oficinas
  useEffect(() => {
    fetch('http://localhost:5000/projetos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setOficina(data)
        //console.log(data)
      })
      .catch((err) => console.log(err))
  }, [])


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

  //Pega valor dos selection do formulário
  function handleCategory(e) {
    setDadosLocal({
      ...dadosLocal, oficina:
      {
        id: e.target.value,
        oficina: e.target.options[e.target.selectedIndex].text,
      }             
    })
  }

  function handleCategory2(e) {
    setDadosLocal({
      ...dadosLocal, oficineiro:
      {
        id: e.target.value,
        nome: e.target.options[e.target.selectedIndex].text,
      }        
    })
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
              <SelectOficinas
                
                autoFocus
                propsDados={oficina}
                valor={dadosLocal.oficina ? dadosLocal.oficina.id : ''}
                handleOnChange={handleCategory}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
              <Form.Label>Oficineiro:</Form.Label>
              <Select
                propsDados={oficineiros}
                valor={dadosLocal.oficineiro ? dadosLocal.oficineiro.id : ''}
                handleOnChange={handleCategory2}
              />

            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
              <Form.Label>Dias da Semana:</Form.Label>
              <Form.Control
                type="text"
                name="diasSemana"
                placeholder="segunda-feira, terça..."
                onChange={handleChange}
                value={dadosLocal.diasSemana ? dadosLocal.diasSemana : ''}
              />
            </Form.Group>

            <Form.Group className={styles.containerHorario} controlId="exampleForm.ControlInput1" >
              <Form.Label>Horário: </Form.Label>
              <Form.Control
                className={styles.time}
                type="time"
                name="horarioInicio"
                placeholder="08"
                onChange={handleChange}
                value={dadosLocal.horarioInicio ? dadosLocal.horarioInicio : ''}
              />
              -
              <Form.Control
                className={styles.time}
                type="time"
                name="horarioFim"
                placeholder="10"
                onChange={handleChange}
                value={dadosLocal.horarioFim ? dadosLocal.horarioFim : ''}
              />
            </Form.Group>
            <Form.Group className={styles.containerHorario} controlId="exampleForm.ControlInput1" >
              <Form.Label>Vagas:</Form.Label>
              <Form.Control
                className={styles.vagas}
                type="number"
                name="lotacao"
                placeholder="25"
                onChange={handleChange}
                value={dadosLocal.lotacao ? dadosLocal.lotacao : ''}
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
