import styles from '../CadastroOficina/CardsOficina.module.scss'
import React, { useState, useEffect } from 'react';

//LAYOUT
import CadastroTurmaModal from './CadastroTurmaModal';

function CardsAssistido({ id, titulo, paragrafo, pesquisa, oficina, metodoAtualizaOficina }) {

    const remove = (e) => {
        e.preventDefault()
        pesquisa(id)
        setOficina2({})

        
      }

      // Oficina
        const [oficina2, setOficina2 ] = useState(oficina || {})




    return (
        <div className={styles.container}>
            <div className={styles.cards}>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{oficina.id} | {oficina.nome}</h5>
                        <p className="card-text">{oficina.requisitos}</p>
                        <div className={styles.buttons}>
                            <button className="btn btn-outline-danger" onClick={remove}>Excluir</button>

                            <CadastroTurmaModal 
                            textbtn={'Editar'} 
                            titulo={'Editar Oficina'} 
                            nome={titulo} 
                            id={id} 
                            requesitos={paragrafo} 
                            propOficina={oficina2} 
                            metodoAtualizaOficina={metodoAtualizaOficina}
                            />

                        </div>

                    </div>
                </div>
            </div>

        </div>


    )
}

export default CardsAssistido