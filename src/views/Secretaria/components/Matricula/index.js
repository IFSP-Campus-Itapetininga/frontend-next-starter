import { Container } from 'react-bootstrap';
import { Layout } from 'layout';
import LayoutInicio from '../layout/modeloTelaCrud'



const Secretaria = () => {
  return (
    <Layout session="Secretaria">
    <Container className="py-5">
        <LayoutInicio titulo={'Matricula'} />
    </Container>
  </Layout>
  )
}

export default Secretaria
