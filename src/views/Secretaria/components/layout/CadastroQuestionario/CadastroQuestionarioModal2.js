import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Selects from 'react-select'
import makeAnimated from "react-select/animated";
import Select from "../CadastroQuestionario/Select"

function CadastroQuestionarioModal({ textbtn, titulo, metodoCadastraDados, propsDados, metodoAtualizaDados }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const animatedComponents = makeAnimated();//Select Animated

  // dados locais | recebe valores dos props ou dos campos
  const [dadosLocal, setDadosLocal] = useState(propsDados || {})

  // Setar Aluno options campo select
  const [options, setOptions] = useState([])

  // Carrega Dados de Turma
  const [perguntas, setPerguntas] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/perguntas', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setPerguntas(data)
        //console.log(data)
      })
      .catch((err) => console.log(err))
  }, [])

  //Pega valor dos inputs do formulário
  function handleChange(e) {
    setDadosLocal({ ...dadosLocal, [e.target.name]: e.target.value })
    let texto = { [e.target.name]: e.target.value }
  }

  //Pega valor dos selection do formulário
  function handleCategory(e) {
    setDadosLocal({ ...dadosLocal, questionario: e })
    //console.log(dadosLocal)
  }

  //Passa para o componente pai(TelaCrud/método cadastrarQuestionario) os valores de questionario.
  const enviaDados = (e) => {
    e.preventDefault()//não deixa a págian dar reload
    //console.log(dadosLocal)
    if (titulo === `Editar Dados`) {
      metodoAtualizaDados(dadosLocal)
    } else if (titulo === "Cadastrar Dados") {
      metodoCadastraDados(dadosLocal)
    }
    setDadosLocal({})//esvazia set questionario
    setShow(false)
  }

  //Carrega assistido / aluno
  useEffect(() => {
    fetch('http://localhost:5000/assistido', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        let option = []
        data.forEach((dado) => {
          option = [...option, { value: dado.id, label: ' ' + dado.id + ' | ' + dado.cpf + ' | ' + dado.nome }]

        })
        console.log(option)
        setOptions(options)
      })
      .catch((err) => console.log(err))
  }, [])

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
              <Form.Label>Novo Grupo:</Form.Label>
              <Form.Control
                type="text"
                name="diasSemana"
                placeholder="Psicologia 1"
                onChange={handleChange}
                value={dadosLocal.diasSemana ? dadosLocal.diasSemana : ''}
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

export default CadastroQuestionarioModal
