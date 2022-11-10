import { Container } from 'react-bootstrap'; 
import { Layout } from 'layout';
import { useEffect, useState } from 'react';
import api from '../../services';
import {Form, Modal, Button} from 'react-bootstrap'

import style from './Waitlist.module.scss' 

export default function Waitlist() { 
  
  const[nome, setNome] = useState([]);
  const[dataNascimento, setDataNascimento] = useState([]);
  const[dataCadastro, setDataCadastro] = useState([]);
  const[alfabetizado, setAlfabetizado] = useState([]);
  const[escolaridade, setEscolaridade] = useState([]);
  const[nomeResponsavel, setNomeResponsavel] = useState([]);
  const[telefone, setTelefone] = useState([]);

  const[alunoList, setAlunoList] = useState([]);

  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  async function getWaitlist(){ 
    const response = await api.get('/waitlist');
    setAlunoList(response.data)
    console.log(response.data);
  }

  async function sendWaitlist (){
    const data = {
      nome: nome,
      alfabetizado: alfabetizado,
      escolaridade: escolaridade,
      dataNascimento: dataNascimento,
      dataCadastro: new Date().toLocaleDateString(),
      nomeResponsavel: nomeResponsavel,
      telefone: telefone
    }
    console.log(JSON.stringify(data));
    const response = await api.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/waitlist`, JSON.stringify(data), {
      header: {
        'Content-Type': 'application/json' 
      }
    }).then(res => console.log("Inserindo informações", res)).catch(err => console.log("Erro", err))
    
  }

  function calculaIdade(dateString){
    const hoje = new Date();
    const dataNasci = new Date(dateString)
    let idade = hoje.getFullYear() - dataNasci.getFullYear();
    const m = hoje.getMonth() - dataNasci.getMonth();

    if(m < (m === 0 && hoje.getDate() < dataNasci.getDate())){
      idade--
    }
    return idade;
  }

  useEffect(() => {
    getWaitlist()
  },[])
  
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
                    <th>Nome do responsável</th>
                    <th>Telefone</th>
                    <th>Ações</th>
                </tr>
            </thead>
            {alunoList.map((get, key) => {
              return (
                <tbody key={get.id}>
                  <tr>
                    <td><b>{get.nome}</b></td>
                    <td>{calculaIdade(get.dataNascimento)}</td>
                    <td>{get.dataCadastro}</td>
                    <td>{get.alfabetizado}</td>
                    <td>{get.escolaridade}</td>
                    <td>{get.nomeResponsavel}</td>
                    <td>{get.telefone}</td>
                    <td>
                      <a href="#editEmployeeModal" className="edit" data-toggle="modal">Edit</a>
                      <a href="#deleteEmployeeModal" className="delete" data-toggle="modal">Delete</a>                  
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
              <Form>
                <Form.Group>
                  <Form.Control 
                    input="true"
                    type="text"
                    placeholder="Nome *"
                    required
                    value={nome}
                    onChange={(event) => {
                      setNome(event.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control 
                      input="true"
                      type="text"
                      placeholder="Alfabetizado *"
                      required
                      value={alfabetizado}
                      onChange={(event) => {
                        setAlfabetizado(event.target.value);
                      }}
                    />
                </Form.Group>
                <Form.Group>
                  <Form.Control 
                    input="true"
                    type="text"
                    placeholder="Escolaridade *"
                    required
                    value={escolaridade}
                    onChange={(event) => {
                      setEscolaridade(event.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control 
                    input="true"
                    type="date"
                    placeholder="Data de Nascimento *"
                    required
                    value={dataNascimento}
                    onChange={(event) => {
                      setDataNascimento(event.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control 
                    input="true"
                    type="text"
                    placeholder="Nome do Responsável *"
                    required
                    value={nomeResponsavel}
                    onChange={(event) => {
                      setNomeResponsavel(event.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control 
                    input="true"
                    type="text"
                    placeholder="Telefone*"
                    required
                    value={telefone}
                    onChange={(event) => {
                      setTelefone(event.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control 
                    input="true"
                    type="text"
                    value={new Date().toLocaleDateString()}
                    readOnly
                    onChange= {(event) => {
                      setDataCadastro(event.target.value);
                    }}
                  />
                </Form.Group>

                <Button onClick={sendWaitlist}>
                  Cadastrar
                </Button>
              </Form>
            </Modal.Body>
          </Modal>

        </div>
      </Container>

    </Layout>
    ) 
}