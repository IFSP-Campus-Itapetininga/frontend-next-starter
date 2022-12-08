import styles from '../CadastroOficina/CardsOficina.module.scss'
import React, { useState, useEffect } from 'react';

/* IMPORT LAYOUT */
import CadastroOficinaModal from './CadastroOficinaModal';

function CardsOficina({ pesquisa, propsDados, propsNomeAtividade, metodoAtualizaDados }) {

    console.log(propsDados)
    
    const remove = (e) => {
        e.preventDefault()
        console.log(propsDados.id)
        pesquisa(dadosLocal.id)
        setDadosLocal([])        
      }

      // Oficina
        const [dadosLocal, setDadosLocal] = useState(propsDados || [])

    return (
        <div className={styles.container}>
            <div className={styles.cards}>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{dadosLocal.id} | {dadosLocal.nome}</h5>
                        <p className="card-text"><b>Atividade: </b> {propsNomeAtividade}</p>
                        <p className="card-text"><b>Idade mínima: </b>{dadosLocal.idademinima} | <b>Idade máxima: </b>{dadosLocal.idademaxima}</p>
                        <p className="card-text"><b>Outras Requisitos: </b>{dadosLocal.requisito}</p>
                        <div className={styles.buttons}>
                            <button className="btn btn-outline-danger" onClick={remove}>Excluir</button>

                            <CadastroOficinaModal 
                                textbtn={'Editar'} 
                                titulo={'Editar Dados'} 
                                propsDados={dadosLocal} 
                                metodoAtualizaDados={metodoAtualizaDados}
                            />

                        </div>

                    </div>
                </div>
            </div>

        </div>


    )
}

export default CardsOficina