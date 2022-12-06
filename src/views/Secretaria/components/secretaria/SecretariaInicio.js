import React, { useState } from 'react';
import styles from './SecretariaInicio.module.scss'

// IMPORT IMAGE
import Image from 'next/image';


// IMPORT LAYOUT
import TelaCrudOficina from '../layout/CadastroOficina/TelaCrudOficina';
import TelaCrudOficineiro from '../layout/CadastroOficineiro/TelaCrudOficineiro';
import TelaCrudAssistido from '../layout/CadastroAssistido/TelaCrudAssistido';
import TelaCrudTurma from '../layout/CadastroTurma/TelaCrudTurma';
import TelaCrudMatricula from '../layout/CadastroMatricula/TelaCrudMatricula';
import TelaCrudAtividade from '../layout/CadastroAtividade/TelaCrudAtividade';



function SecretariaInicio(){



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
                    
                    <h1>Secretaria Institucional</h1>
                    <hr/>
                    <div className={styles.containerCards}>
                        <div className={styles.cardContainer} onClick={mostrarCadastroOficina}>
                            <Image  src="/asset/imgCadastrarOficina.svg" width="95%" height="95%" alt="Oficina" />
                            <p>Cadastrar Oficina</p>
                        </div>
                        <div className={styles.cardContainer} onClick={mostrarCadastroOficineiro}>
                             <Image  src="/asset/imgOficineiro.svg" width="95%" height="95%" alt="Oficineiro" />
                            <p >Profissional </p>
                        </div>
                        <div className={styles.cardContainer} onClick={mostrarCadastroAssistido}>
                            <Image  src="/asset/imgAssistido.svg" width="95%" height="95%" alt="Aluno" />                        
                            <p >Assitido / Aluno </p>
                        </div>
                        <div className={styles.cardContainer} onClick={mostrarCadastroTurma}>
                            <Image  src="/asset/imgTurma.svg" width="95%" height="95%" alt="Turma" />  
                            <p >Cadastrar Turma </p>
                        </div>
                        <div className={styles.cardContainer} onClick={mostrarMatricula}>
                            <Image  src="/asset/imgMatricula.svg" width="95%" height="95%" alt="Matricula" />  
                            <p >Matrícula</p>
                        </div>
                        <div className={styles.cardContainer} onClick={mostrarMatricula}>
                            <Image  src="/asset/imgResponsavel.svg" width="95%" height="95%" alt="Responsável" />  
                            <p >Responsável</p>
                        </div>
                        <div className={styles.cardContainer} onClick={mostrarMatricula}>
                            <Image  src="/asset/imgAtividades.svg" width="95%" height="95%" alt="Atividades" />  
                            <p >Atividades</p>
                        </div>
                        <div className={styles.cardContainer} onClick={mostrarMatricula}>
                            <Image  src="/asset/imgFrequencia.svg" width="95%" height="95%" alt="Frequência" />  
                            <p >Frequência</p>
                        </div>
                        <div className={styles.cardContainer} onClick={mostrarMatricula}>
                            <Image  src="/asset/imgFilaEspera.svg" width="95%" height="95%" alt="Fila de Espera" />  
                            <p >Fila de Espera</p>
                        </div>
                        <div className={styles.cardContainer} onClick={mostrarMatricula}>
                            <Image  src="/asset/imgAula.svg" width="95%" height="95%" alt="Eventos e Aulas" />  
                            <p >Evento / Aula</p>
                        </div>
                    </div>
                </div>
            ) }

            { showCadastrarOficina === true && (
                <div>                    
                    <TelaCrudOficina 
                        titulo={'Cadastro Oficina'} 
                        fechar={setShowCadastrarOficina}  
                        abrir={setShowMainSecretaria} 
                        metodoShowAtividade={mostrarAtividade}
                        placeholder={'Consultar Oficina'}   
                    />
                </div>
            ) }
            { showCadastroOficineiro === true && (
                <div>  
                   <TelaCrudOficineiro
                        titulo={'Cadastro Oficineiro'} 
                        fechar={setShowCadastrarOficineiro}  
                        abrir={setShowMainSecretaria} 
                        placeholder={'Consultar Oficineiro'} 
                    />
                </div>
            ) }
            { showCadastrarAssistido === true && (
                <div>                    
                     <TelaCrudAssistido
                        titulo={'Cadastro Assistido'} 
                        fechar={setShowCadastrarAssistido}  
                        abrir={setShowMainSecretaria} 
                        placeholder={'Consultar Assistido'} 
                    />
                </div>
            ) }
            { showCadastrarTurma === true && (
                <div>                    
                     <TelaCrudTurma
                        titulo={'Cadastro Turma'} 
                        fechar={setShowCadastrarTurma}  
                        abrir={setShowMainSecretaria} 
                        placeholder={'Consultar Turma'} 
                    />
                </div>
            ) }
            { showMatricula === true && (
                <div>                    
                     <TelaCrudMatricula
                        titulo={'Matrícula'} 
                        fechar={setShowMatricula}  
                        abrir={setShowMainSecretaria} 
                        placeholder={'Consultar matrícula'} 
                    />
                </div>
            ) }
            { showAtividade === true && (
                <div>                    
                     <TelaCrudAtividade
                        titulo={'Atividade'} 
                        fechar={setShowAtividade}  
                        abrir={setShowMainSecretaria} 
                        placeholder={'Consultar Atividade'} 
                    />
                </div>
            ) }


            
        </>
    )
}


export default SecretariaInicio


