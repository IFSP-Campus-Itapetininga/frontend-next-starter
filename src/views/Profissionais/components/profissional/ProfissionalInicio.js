import React, { useState } from 'react';
import styles from './SecretariaInicio.module.scss'


// IMPORT LAYOUT
import TelaCrudOficina from '../layout/CadastroOficina/TelaCrudOficina';
import TelaCrudOficineiro from '../layout/CadastroOficineiro/TelaCrudOficineiro';
import TelaCrudAssistido from '../layout/CadastroAssistido/TelaCrudAssistido';
import TelaCrudTurma from '../layout/CadastroTurma/TelaCrudTurma';
import TelaCrudMatricula from '../layout/CadastroMatricula/TelaCrudMatricula';
import TelaCrudAtividade from '../layout/CadastroAtividade/TelaCrudAtividade';



function ProfissionalInicio(){



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
                            <img src='/asset/imgChamada.svg' alt='Cadastro Oficina' className='card-img-top'/>
                            <p>Fazer Chamada</p>
                        </div>
                        <div className={styles.cardContainer} onClick={mostrarCadastroOficina}>
                            <img src='/asset/imgQuestionario.svg' alt='Cadastro Oficina' className='card-img-top'/>
                            <p>Questionário </p>
                        </div>
                        <div className={styles.cardContainer} onClick={mostrarCadastroOficina}>
                            <img src='/asset/imgFrequencia.svg' alt='Cadastro Oficina' className='card-img-top'/>
                            <p>Frequência</p>
                        </div>
                        <div className={styles.cardContainer} onClick={mostrarCadastroOficina}>
                            <img src='/asset/imgAula.svg' alt='Cadastro Oficina' className='card-img-top'/>
                            <p>Aula / Evento </p>
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


export default ProfissionalInicio


