import React, { useState } from 'react';

import TelaCrud from '../layout/TelaCrud';
import Teste from '../layout/Teste'


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
                    <div onClick={mostrarCadastroOficina}> Cadastrar Oficina </div>                
                    <div onClick={mostrarCadastroOficineiro}>Cadastro Oficineiro</div>
                    <div onClick={mostrarCadastroAssistido}>Cadastro Assistido</div>
                    <div onClick={mostrarCadastroTurma}>Cadastro Turma</div>
                    <div onClick={mostrarMatricula}>Matrícula</div>
                </div>
            ) }
            { showCadastrarOficina === true && (
                <div>                    
                    <TelaCrud 
                        titulo={'Cadastro Oficina'} 
                        fechar={setShowCadastrarOficina}  
                        abrir={setShowMainSecretaria} 
                        placeholder={'Consultar Oficina'}   
                    />
                </div>
            ) }
            { showCadastroOficineiro === true && (
                <div>  
                    <TelaCrud 
                        titulo={'Cadastro Oficineiro'} 
                        fechar={setShowCadastrarOficineiro}  
                        abrir={setShowMainSecretaria}    
                    />
                </div>
            ) }
            { showCadastrarAssistido === true && (
                <div>                    
                    <div onClick={() => ( setShowMainSecretaria(true), setShowCadastrarAssistido(false))}> Voltar ao Inicio </div>
                    <div> Cadastro Oficina </div>
                </div>
            ) }
            { showCadastrarTurma === true && (
                <div>                    
                    <div onClick={() => ( setShowMainSecretaria(true), setShowCadastrarTurma(false))}> Voltar ao Inicio </div>
                    <div> Cadastro Oficina </div>
                </div>
            ) }
            { showMatricula === true && (
                <div>                    
                    <div onClick={() => ( setShowMainSecretaria(true), setShowMatricula(false))}> Voltar ao Inicio </div>
                    <div> Cadastro Oficina </div>
                </div>
            ) }
            
        </>
    )
}


export default SecretariaInicio


