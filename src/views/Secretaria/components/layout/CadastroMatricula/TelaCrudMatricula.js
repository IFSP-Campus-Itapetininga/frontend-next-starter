import styles from '../CadastroOficina/TelaCrudOficina.module.scss'
import React, { useState, useEffect } from 'react';



// Import Layout

import CadastroMatriculaModal from './CadastroMatriculaModal';
import CardsMatricula from './CardsMatricula';

/*
    Props
        titulo      = título da página
        abrir       = tela que deve ser aberta
        fechar      = tela que deve ser fechada
        placeholder = texto dentro do input    

*/

function TelaCrudMatricula({ titulo, abrir, fechar, placeholder }) {

    //CRUD referente ao dado
    const dado = 'turma'

    //Salvar os dados
    const [dados, setDados] = useState([])

    //palavra de busca
    const [palavra, setPalavra] = useState()

    //mensagem
    const [mensagem, setMensagem] = useState(false)

    //URL API
    const urlAPI = `http://localhost:5000/${dado}`

    //Apagar o campo de busca após resultado for verdadeiro
    const [consulta, setConsulta] = useState()

    // Fechar a atual tela e abrir a tela inicial
    function abrirFechar() {
        abrir(true) // abri a tela inicio
        fechar(false) // fecha a tela atual
    }

    //Carregamento Inicial ao abrir o componente
    useEffect(() => {
        fetch(`${urlAPI}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            resp => resp.json()
        ).then(
            data => {                
                setMensagem(true),
                setDados(data)
            }
        ).catch(
            err => console.log(err)
        )
    }, [])

    //recarrega página
    function recarregaPagina() {
        fetch(`${urlAPI}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(

            resp => resp.json()


        ).then(

            data => {

                console.log(data)
                setDados(data)
            }

        ).catch(

            err => console.log(err)

        )
    }


    //Carrega as palavras pesquisadas    
    function carregaPesquisa(palavra) {
        let dados = RegExp(`${palavra}`, 'gi')
        fetch(`${urlAPI}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            resp => resp.json()
        ).then(
            data => {

                function busca(dado) {
                    let teste = dado.search(dados) > -1 ? true : false
                    //console.log(teste) verdadeiro ou falso

                    if (teste) {
                        setMensagem(false)                        
                        apagaCampoBusca()
                        return teste
                    } else {
                        setMensagem(true)
                        return teste       
                    }
                }
                
                setDados(data.filter((dado) =>
                    busca(dado.nome),
                    setMensagem(false)
                ))
            },
        ).catch(
            err => console.log(err)
        )
    }
    
    //não deixa a págian dar reload
    const submit = (e) => {
        e.preventDefault()
        carregaPesquisa(palavra)
    }

    //Pega valor dos inputs do formulário
    function buscaInput(e) {
        let texto = e.target.value
        carregaPesquisa(texto)
        setPalavra(texto)
        setConsulta(texto)
    }

    //Cadastrar nova oficineiro
    function cadastraDados(dados) {
        fetch(`${urlAPI}`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(dados) // vai receber a nova oficina
            })
            .then(

                (resp) => resp.json()
            )
            .then(
                (data) => { console.log(data) },
                // adicionar mensagem
                carregaPesquisa(dados.nome),
                timeOut()
            )
            .catch(
                (err) => console.log(err)
            )
    }

    //Remover oficina pelo ID
    function removeDadosID(id) {
        fetch(`${urlAPI}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(

            timeOut(),
            resp => resp.json()
        ).then(
            data => {

            }
        ).catch(
            err => console.log(err)

        )
    }

    //Limpa variaveis e atualiza
    function timeOut() {
        setTimeout(() => {
            setPalavra(''),
            setDados({}),
            recarregaPagina()
        }, "4000")
    }

    //Apagar o campo após um tempo sem interação
    function apagaCampoBusca(){
        setTimeout(() => {
            setPalavra('')
            setConsulta('')
        }, "5000")
    }

    //atualizar os dados
    function atualizaDados(dados) {
        fetch(`${urlAPI}/${dados.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(dados) // vai receber a nova oficina
            })
            .then(

                (resp) => resp.json()
            )
            .then(
                (data) => { console.log(data) },
                // adicionar mensagem
                carregaPesquisa(dados.nome),
                timeOut()
            )
            .catch(
                (err) => console.log(err)
            )
    }



    //Render
    return (
        <div className={styles.container}>

            <div className={styles.header}>
                <h1>{titulo}</h1>
                <div>
                    <button onClick={abrirFechar} className="btn btn-dark">Voltar</button>
                </div>
            </div>
            <hr />

            <div className={styles.formDiv}>
                <form onSubmit={submit}>
                    <input
                        type="text"
                        name='nome'
                        value={consulta}
                        placeholder={placeholder}
                        onChange={buscaInput}
                    />

                    <button
                        className='btn btn-primary'
                        onClick={carregaPesquisa}
                        
                    >Consultar
                    </button>


                </form>
                <div className={styles.btncadastro}>

                    <CadastroMatriculaModal

                        textbtn={'Matricular Alunos por Turma'}
                        titulo={'Matrícula Alunos por Turma'}
                        metodoCadastraDados={cadastraDados}

                    />

                </div>
            </div>

            <section className={styles.mainSection}>
                {dados.length <= 0 && mensagem === true && (
                    <p>Não foram encontradas referências para o termo: {palavra}!</p>
                )}
                {dados.length > 0 &&
                    dados.map((dado) => (
                        <CardsMatricula
                            key={dado.id}
                            propsDados={dado}                            
                            pesquisa={removeDadosID}                            
                            metodoAtualizaDados={atualizaDados}
                        />
                    ))

                }
                {dados.length <= 0 && mensagem !== true && (
                     <div className={styles.loader}><img src='/loader.svg' alt='Cadastro Oficina' /></div>
                    
                )}


            </section>


        </div>

    )


}

export default TelaCrudMatricula