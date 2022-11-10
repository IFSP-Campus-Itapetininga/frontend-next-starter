import style from './Secretaria.module.scss'

import { Container } from 'react-bootstrap';
import { Layout } from 'layout';

//Importar Componente Página Início Secretaria Institucional
import  ProfissionalInicio from './components/profissional/ProfissionalInicio'

const Secretaria = () => {
  return (
    <Layout session="Secretaria">
    <Container className="py-5">
      <ProfissionalInicio />
    </Container>
  </Layout>
  )
}

export default Secretaria
