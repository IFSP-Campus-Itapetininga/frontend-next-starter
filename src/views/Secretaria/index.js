import style from './Secretaria.module.scss'

import { Container } from 'react-bootstrap';
import { Layout } from 'layout';

//Importar Componente Página Início Secretaria Institucional
import  SecretariaInicio from './components/secretaria/SecretariaInicio'

const Secretaria = () => {
  return (
    <Layout session="Secretaria">
    <Container className="py-5">
      <SecretariaInicio />
    </Container>
  </Layout>
  )
}

export default Secretaria
