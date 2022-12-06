import styles from '../CadastroOficina/CardsOficina.module.scss'
import React, { useState, useEffect } from 'react';

/* IMPORT LAYOUT */
import CadastroMatriculaModal from './CadastroMatriculaModal';

function CardsMatricula({ pesquisa, propsDados, metodoAtualizaDados }) {

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



                        <h5 className="card-title">{dadosLocal.id} | {dadosLocal.oficina.oficina}</h5>
                        <p className="card-text"><b>Oficineiro: </b>{dadosLocal.oficineiro.nome}</p>
                        <p className="card-text"><b>Capacidade: </b>{dadosLocal.lotacao} | <b>Matriculados: </b>{dadosLocal.lotacao} | <b>Vagas: </b>{dadosLocal.lotacao}</p>
                        <p className="card-text"></p>


                        <div className={styles.buttons}>
                            <button className="btn btn-outline-danger" onClick={remove}>Excluir</button>

                            <CadastroMatriculaModal
                                textbtn={'Matricular'}
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

export default CardsMatricula