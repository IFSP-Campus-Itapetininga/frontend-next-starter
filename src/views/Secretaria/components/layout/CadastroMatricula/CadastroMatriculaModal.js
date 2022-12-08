import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Selects from 'react-select'
import makeAnimated from "react-select/animated";
import Select from "../CadastroTurma/Select"

function CadastroOficinaModal({ textbtn, titulo, metodoCadastraDados, propsDados, metodoAtualizaDados }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const animatedComponents = makeAnimated();//Select Animated

  // dados locais | recebe valores dos props ou dos campos
  const [dadosLocal, setDadosLocal] = useState(propsDados || {})

  // Setar Aluno options campo select
  const [options, setOptions] = useState([])

  const urlAPI = `${process.env.NEXT_PUBLIC_API_BASE_URL}/secretary`


  // Carrega Dados de Turma
  const [turma, setTurma] = useState([])
  useEffect(() => {
    fetch(`${urlAPI}/turma`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setTurma(data)
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
    setDadosLocal({ ...dadosLocal, oficina: e })
    //console.log(dadosLocal)
  }

  //Passa para o componente pai(TelaCrud/método cadastrarOficina) os valores de oficina.
  const enviaDados = (e) => {
    e.preventDefault()//não deixa a págian dar reload
    //console.log(dadosLocal)
    if (titulo === `Editar Dados`) {
      metodoAtualizaDados(dadosLocal)
    } else if (titulo === "Cadastrar Dados") {
      metodoCadastraDados(dadosLocal)
    }
    setDadosLocal({})//esvazia set oficineiro
    setShow(false)
  }

  //Carrega assistido / aluno
  useEffect(() => {
    fetch(`${urlAPI}/assistido`, {
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
              <Form.Label>Turma:</Form.Label>
              <Select
                propsDados={turma}
                
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >

              <Form.Label>Alunos:</Form.Label>

              <Selects
                defaultValue={dadosLocal.nome ? dadosLocal.id : ''}
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

export default CadastroOficinaModal
