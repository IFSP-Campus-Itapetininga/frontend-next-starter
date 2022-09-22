import { Alert, Container } from 'react-bootstrap';

import styles from './Home.module.scss';

function Home() {
  return (
    <Container>
      <div className={styles.content}>
        <Alert variant="success">Ola</Alert>
      </div>
    </Container>
  );
}

export default Home;
