import style from './Secretaria.module.scss'

import { Container } from 'react-bootstrap';
import { Layout } from 'layout';

//Importar Componente Página Início Secretaria Institucional
import  AssistidoInicio from './components/assistido/AssistidoInicio'

const Secretaria = () => {
  return (
    <Layout session="Secretaria">
    <Container className="py-5">
      <AssistidoInicio />
    </Container>
  </Layout>
  )
}

export default Secretaria
