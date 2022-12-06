import styles from '../CadastroOficina/TelaCrudOficina.module.scss'
import React, { useState, useEffect } from 'react';

// IMPORT IMAGE
import Image from 'next/image';


// Import Service
import {
    getAlunos,
    getAluno,
    editAluno,
    deleteAluno,
    createAluno
} from 'services';


// Import Layout

import CadastroAssistidoModal from './CadastroAssistidoModal';
import CardsAssistido from './CardsAssistido';

/*
    Props
        titulo      = título da página
        abrir       = tela que deve ser aberta
        fechar      = tela que deve ser fechada
        placeholder = texto dentro do input    

*/

function TelaCrudAssistido({ titulo, abrir, fechar, placeholder }) {

    //CRUD referente ao dado
    const dado = 'assistido'

    //Salvar os dados
    const [dados, setDados] = useState([])

    //palavra de busca
    const [palavra, setPalavra] = useState()

    //mensagem
    const [mensagem, setMensagem] = useState(false)    

    //Apagar o campo de busca após resultado for verdadeiro
    const [consulta, setConsulta] = useState()

    // Fechar a atual tela e abrir a tela inicial
    function abrirFechar() {
        abrir(true) // abri a tela inicio
        fechar(false) // fecha a tela atual
    }

    //Carregamento Inicial ao abrir o componente
    useEffect(() => {
        let data = getAlunos().json()
        console.log(data)
        setMensagem(true),
            setDados(data)
    }, [])

    //recarrega página
    function recarregaPagina() {
        let data = getAlunos().json()
        setDados(data)
    }

    //Carrega as palavras pesquisadas    
    function carregaPesquisa(palavra) {
        let dados = RegExp(`${palavra}`, 'gi')
        let data = getAlunos().json()

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
        createAluno(dados)
        carregaPesquisa(dados.nome),
        timeOut()
    }

    //Remover oficina pelo ID
    function removeDadosID(id) {
        deleteAluno(id)
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
    function apagaCampoBusca() {
        setTimeout(() => {
            setPalavra('')
            setConsulta('')
        }, "5000")
    }

    //atualizar os dados
    function atualizaDados(dados) {
        editAluno(dados)
        carregaPesquisa(dados.nome),
        timeOut()
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

                    <CadastroAssistidoModal

                        textbtn={'Cadastrar'}
                        titulo={'Cadastrar Dados'}
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
                        <CardsAssistido
                            key={dado.id}
                            propsDados={dado}
                            pesquisa={removeDadosID}
                            metodoAtualizaDados={atualizaDados}
                        />
                    ))

                }
                {dados.length <= 0 && mensagem !== true && (
                    <div className={styles.loader}>
                        <Image  src="/loader.svg" width="95%" height="95%" alt="Loader" />
                    </div>
                )}


            </section>


        </div>

    )


}

export default TelaCrudAssistido