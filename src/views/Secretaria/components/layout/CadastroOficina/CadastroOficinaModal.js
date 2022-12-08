import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import Select from '../CadastroTurma/Select';

function CadastroTurmaModal({ textbtn, metodoAbriFecha, metodoShowAtividade, titulo, metodoCadastraDados, propsDados, metodoAtualizaDados }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // dados locais
  const [dadosLocal, setDadosLocal] = useState(propsDados || {})

  // Dados Atividade
  const [atividades, setAtividades ] = useState([])

  //Pega valor dos inputs do formulário
  function handleChange(e) {
    setDadosLocal({ ...dadosLocal, [e.target.name]: e.target.value })
    let texto = { [e.target.name]: e.target.value }
  }

  //Pega valor dos selection do formulário
  function handleCategory(e){
    setDadosLocal({ ...dadosLocal, atividade:{
        id: e.target.value,
        nome: e.target.options[e.target.selectedIndex].text,
    } })
    console.log(dadosLocal)
}

const urlAPI = `${process.env.NEXT_PUBLIC_API_BASE_URL}/secretary`

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

  //Abrir tela atividade
  function abrirTelaAtividade(){
    setShow(false)
    metodoShowAtividade()
  }

  //Carrega Select Atividades
  useEffect(() => {
    fetch(`${urlAPI}/atividade`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        },
    })
    .then((resp) => resp.json())
    .then((data) => {
      setAtividades(data),
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
              <Form.Control
                type="text"
                name="oficina"
                placeholder="Nome/título da oficina "
                autoFocus
                onChange={handleChange}
                value={dadosLocal.oficina ? dadosLocal.oficina : ''}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
              <Form.Label>Atividade:</Form.Label>
              <Select 

                propsDados={atividades}
                valor={dadosLocal.atividade ? dadosLocal.atividade.id : ''}
                handleOnChange={handleCategory}
              
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
              <Form.Label>Idade Mínima:</Form.Label>
              <Form.Control
                type="number"
                name="idademinima"
                placeholder="12"
                onChange={handleChange}
                value={dadosLocal.idademinima ? dadosLocal.idademinima : ''}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
              <Form.Label>Idade Máxima:</Form.Label>
              <Form.Control
                type="number"
                name="idademaxima"
                placeholder="15"
                onChange={handleChange}
                value={dadosLocal.idademaxima ? dadosLocal.idademaxima : ''}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
              <Form.Label>Outras restrições:</Form.Label>
              <Form.Control
                as="textarea"
                name="requisito"
                placeholder="Digite algum requisito além da idade mínima."
                onChange={handleChange}
                value={dadosLocal.requisito ? dadosLocal.requisito : ''}
              />
            </Form.Group>


          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={abrirTelaAtividade}>
            Cadastrar Atividade
          </Button>
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
