import React, { useState } from 'react';
import styles from './SecretariaInicio.module.scss'


// IMPORT LAYOUT
import TelaCrudOficina from '../layout/CadastroOficina/TelaCrudOficina';
import TelaCrudOficineiro from '../layout/CadastroOficineiro/TelaCrudOficineiro';
import TelaCrudAssistido from '../layout/CadastroAssistido/TelaCrudAssistido';



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


    
    

    

    return(
        <>

            { showMainSecretaria === true  && (




                <div className='container' >

                    
                    <h1>Secretaria Institucional</h1>
                    <hr/>

                    <div className={styles.containerCards}>
                        <div className={styles.cardContainer} onClick={mostrarCadastroOficina}>
                            <img src='/asset/imgCadastrarOficina.svg' alt='Cadastro Oficina' className='card-img-top'/>
                            <p >Cadastrar Oficina </p>
                        </div>
                        <div className={styles.cardContainer} onClick={mostrarCadastroOficineiro}>
                            <img src='/asset/imgOficineiro.svg' alt='Cadastro Oficina' className='card-img-top'/>
                            <p >Cadastrar Oficineiro </p>
                        </div>
                        <div className={styles.cardContainer} onClick={mostrarCadastroAssistido}>
                            <img src='/asset/imgAssistido.svg' alt='Cadastro Oficina' className='card-img-top'/>
                            <p >Cadastrar Assistido </p>
                        </div>
                        <div className={styles.cardContainer} onClick={mostrarCadastroTurma}>
                            <img src='/asset/imgTurma.svg' alt='Cadastro Oficina' className='card-img-top'/>
                            <p >Cadastrar Turma </p>
                        </div>
                        <div className={styles.cardContainer} onClick={mostrarMatricula}>
                            <img src='/asset/imgMatricula.svg' alt='Cadastro Oficina' className='card-img-top'/>
                            <p >Matrícula</p>
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
                     <TelaCrudOficineiro
                        titulo={'Cadastro Turma'} 
                        fechar={setShowCadastrarTurma}  
                        abrir={setShowMainSecretaria} 
                        placeholder={'Consultar Turma'} 
                    />
                </div>
            ) }
            { showMatricula === true && (
                <div>                    
                     <TelaCrudOficineiro
                        titulo={'Matrícula'} 
                        fechar={setShowMatricula}  
                        abrir={setShowMainSecretaria} 
                        placeholder={'Consultar matrícula'} 
                    />
                </div>
            ) }
            
        </>
    )
}


export default SecretariaInicio


