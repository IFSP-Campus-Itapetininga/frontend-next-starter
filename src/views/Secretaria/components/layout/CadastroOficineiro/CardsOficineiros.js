import styles from '../CadastroOficina/CardsOficina.module.scss';
import React, { useState, useEffect } from 'react';

/* IMPORT LAYOUT */
import CadastroOficineiroModal from './CadastroOficineiroModal';

function CardsOficineiros({ pesquisa, propsDados, metodoAtualizaDados }) {
  const remove = (e) => {
    e.preventDefault();
    pesquisa(propsDados.id);
    setDadosLocal({});
  };

  // Oficina
  const [dadosLocal, setDadosLocal] = useState(propsDados || {});

  return (
    <div className={styles.container}>
      <div className={styles.cards}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              {dadosLocal.id} | {dadosLocal.nome}
            </h5>
            <p className="card-text">{dadosLocal.email}</p>
            <p className="card-text">
              <b>CPF: </b>
              {dadosLocal.cpf}
            </p>
            <p className="card-text">
              <b>Oficinas / Atividades: </b>
              {dadosLocal.atividade &&
                dadosLocal.atividade.map((dado, id) => (
                  <div key={id}>{dado.label}</div>
                ))}{' '}
            </p>
            <div className={styles.buttons}>
              <button className="btn btn-outline-danger" onClick={remove}>
                Excluir
              </button>

              <CadastroOficineiroModal
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
  );
}

export default CardsOficineiros;
