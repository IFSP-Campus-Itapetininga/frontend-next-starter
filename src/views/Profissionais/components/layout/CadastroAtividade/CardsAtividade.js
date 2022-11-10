import styles from '../CadastroOficina/CardsOficina.module.scss'
import React, { useState, useEffect } from 'react';

/* IMPORT LAYOUT */
import CadastroAtividadeModal from './CadastroAtividadeModal';

function CardsAtividade({ pesquisa, propsDados, metodoAtualizaDados }) {

    const remove = (e) => {
        e.preventDefault()
        pesquisa(propsDados.id)
        setDadosLocal({})        
      }

      // Oficina
        const [dadosLocal, setDadosLocal] = useState(propsDados || {})

    return (
        <div className={styles.container}>
            <div className={styles.cards}>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{dadosLocal.id} | {dadosLocal.nome}</h5>
                        <p className="card-text">{dadosLocal.cpf}</p>
                        <div className={styles.buttons}>
                            <button className="btn btn-outline-danger" onClick={remove}>Excluir</button>

                            <CadastroAtividadeModal 
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

export default CardsAtividade