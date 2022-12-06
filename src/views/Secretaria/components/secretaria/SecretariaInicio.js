import React, { useState } from 'react';
import styles from './SecretariaInicio.module.scss'


// IMPORT LAYOUT
import TelaCrudOficina from '../layout/CadastroOficina/TelaCrudOficina';
import TelaCrudOficineiro from '../layout/CadastroOficineiro/TelaCrudOficineiro';
import TelaCrudAssistido from '../layout/CadastroAssistido/TelaCrudAssistido';
import TelaCrudTurma from '../layout/CadastroTurma/TelaCrudTurma';
import TelaCrudMatricula from '../layout/CadastroMatricula/TelaCrudMatricula';
import TelaCrudAtividade from '../layout/CadastroAtividade/TelaCrudAtividade';
import TelaCrudQuestionario from '../layout/CadastroQuestionario/TelaCrudQuestionario';



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

    const [showQuestionario, setShowQuestionario] = useState(false);
    function mostrarQuestionario(){
        setShowMainSecretaria(false)
        setShowQuestionario(true)
    }


    
    

    

    return(
        <>
            
            { showMainSecretaria === true  && (


                

                <div className='container' >
                    
                    
                    
                    <h1>Secretaria Institucional</h1>
                    <hr/>
                    
                    <div className={styles.containerCards}>
                        <div className={styles.cardContainer} onClick={mostrarCadastroOficina}>
                            <img src='/asset/imgCadastrarOficina.svg' alt='Cadastro Oficina' className='card-img-top'/>
                            <p>Cadastrar Oficina </p>
                        </div>
                        <div className={styles.cardContainer} onClick={mostrarCadastroOficineiro}>
                            <img src='/asset/imgOficineiro.svg' alt='Cadastro Oficina' className='card-img-top'/>
                            <p >Profissional </p>
                        </div>
                        <div className={styles.cardContainer} onClick={mostrarCadastroAssistido}>
                            <img src='/asset/imgAssistido.svg' alt='Cadastro Oficina' className='card-img-top'/>
                            <p >Assitido / Aluno </p>
                        </div>
                        <div className={styles.cardContainer} onClick={mostrarCadastroTurma}>
                            <img src='/asset/imgTurma.svg' alt='Cadastro Oficina' className='card-img-top'/>
                            <p >Cadastrar Turma </p>
                        </div>
                        <div className={styles.cardContainer} onClick={mostrarMatricula}>
                            <img src='/asset/imgMatricula.svg' alt='Cadastro Oficina' className='card-img-top'/>
                            <p >Matrícula</p>
                        </div>
                        <div className={styles.cardContainer} onClick={mostrarMatricula}>
                            <img src='/asset/imgResponsavel.svg' alt='Responsável' className='card-img-top'/>
                            <p >Responsável</p>
                        </div>
                        <div className={styles.cardContainer} onClick={mostrarMatricula}>
                            <img src='/asset/imgAtividades.svg' alt='Atividade' className='card-img-top'/>
                            <p >Atividades</p>
                        </div>
                        <div className={styles.cardContainer} onClick={mostrarMatricula}>
                            <img src='/asset/imgFrequencia.svg' alt='Frequência' className='card-img-top'/>
                            <p >Frequência</p>
                        </div>
                        <div className={styles.cardContainer} onClick={mostrarMatricula}>
                            <img src='/asset/imgFilaEspera.svg' alt='Fila de Espera' className='card-img-top'/>
                            <p >Fila de Espera</p>
                        </div>
                        <div className={styles.cardContainer} onClick={mostrarMatricula}>
                            <img src='/asset/imgAula.svg' alt='Aula' className='card-img-top'/>
                            <p >Evento / Aula</p>
                        </div>
                        <div className={styles.cardContainer} onClick={mostrarQuestionario}>
                            <img src='/asset/imgAula.svg' alt='Questionario' className='card-img-top'/>
                            <p >Questionário</p>
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
            { showQuestionario === true && (
                <div>                    
                     <TelaCrudQuestionario
                        titulo={'Questionário'} 
                        fechar={setShowQuestionario}  
                        abrir={setShowMainSecretaria} 
                        placeholder={'Consultar Questionários'} 
                    />
                </div>
            ) }


            
        </>
    )
}


export default SecretariaInicio


