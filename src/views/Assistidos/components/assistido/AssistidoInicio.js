import React, { useState } from 'react';
import styles from './AssistidoInicio.module.scss'
// IMPORT IMAGE
import Image from 'next/image';

// IMPORT LAYOUT
import TelaCrudEvento from '../layout/CadastroEvento/TelaCrudEvento';




function AssistidoInicio(){



    //Tela Inicial da Secretaria
    const [showMainSecretaria, setShowMainSecretaria] = useState(true);

    
    
    const [showCadastrarOficina, setShowCadastrarOficina] = useState(false);
    function mostrarCadastroOficina(){
        setShowMainSecretaria(false)
        setShowCadastrarOficina(true)
    }


    const [showCadastroOficineiro, setShowCadastrarOficineiro] = useState(false);
    function mostrarCadastroOficineiro(){
        setShowMainSecretaria(false)
        setShowCadastrarOficineiro(true)
    }

    const [showCadastrarAssistido, setShowCadastrarAssistido] = useState(false);
    function mostrarCadastroAssistido(){
        setShowMainSecretaria(false)
        setShowCadastrarAssistido(true)
    }


    const [showCadastrarTurma, setShowCadastrarTurma] = useState(false);
    function mostrarCadastroTurma(){
        setShowMainSecretaria(false)
        setShowCadastrarTurma(true)
    }


    const [showMatricula, setShowMatricula] = useState(false);
    function mostrarMatricula(){
        setShowMainSecretaria(false)
        setShowMatricula(true)
    }


    const [showAtividade, setShowAtividade] = useState(false);
    function mostrarAtividade(){
        setShowMainSecretaria(false)
        setShowCadastrarOficina(false)
        setShowAtividade(true)
    }


    
    

    

    return(
        <>
            
            { showMainSecretaria === true  && (
                <div className='container' >
                    <h1>Aluno</h1>
                    <hr/>
                    
                    <div className={styles.containerCards}>
                        <div className={styles.cardContainer} onClick={mostrarCadastroOficina}>
                            <Image  src="/asset/imgQuestionario.svg" width="95%" height="95%" alt="Questionário" />
                            <p>Responder Questionário </p>
                        </div>
                        <div className={styles.cardContainer} onClick={mostrarCadastroOficina}>
                            <Image  src="/asset/imgFrequencia.svg" width="95%" height="95%" alt="Consultar Frequência" />
                            <p>Consultar Frequência</p>
                        </div>
                        <div className={styles.cardContainer} onClick={mostrarCadastroOficina}>
                            <Image  src="/asset/imgAula.svg" width="95%" height="95%" alt="Participar de Evento" />
                            <p>Participar de Eventos </p>
                        </div>
                    </div>
                </div>
            ) }

            { showCadastrarOficina === true && (
                <div>                    
                    <TelaCrudEvento 
                        titulo={'Cadastro Oficina'} 
                        fechar={setShowCadastrarOficina}  
                        abrir={setShowMainSecretaria} 
                        metodoShowAtividade={mostrarAtividade}
                        placeholder={'Consultar Oficina'}   
                    />
                </div>
            ) }


            
        </>
    )
}


export default AssistidoInicio


