import { Alert, Container } from 'react-bootstrap';
import styles from './Home.module.scss';

import { Layout } from 'layout';

function Home() {
  return (
    <Layout session="Início">
      <Container>
        <div className={styles.content}>
          <Alert variant="success">Bem-vindo!</Alert>
        </div>
      </Container>
    </Layout>
  );
}

export default Home;
