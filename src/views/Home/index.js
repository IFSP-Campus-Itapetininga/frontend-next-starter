import { Alert, Container } from 'react-bootstrap';

import styles from './Home.module.scss';

import Card from '../../components/Card';

const mockedOrder = [
  {
    id: '001',
    plate: [
      {
        name: 'Bife acebolado (G)',
        price: 56.2,
        amount: 2,
      },
      {
        name: 'Bife acebolado (P)',
        price: 16.5,
        amount: 1,
      },
    ],
    total: 72.7,
    status: 'delivering',
  },
  {
    id: '002',
    plate: [
      {
        name: 'Bife acebolado (G)',
        price: 25,
        amount: 1,
      },
      {
        name: 'Bife acebolado (M)',
        price: 20,
        amount: 1,
      },
      {
        name: 'Bife acebolado (P)',
        price: 15,
        amount: 1,
      },
    ],
    total: 60,
    status: 'delivering',
  },
  {
    id: '003',
    plate: [
      {
        name: 'Bife acebolado (G)',
        price: 25,
        amount: 1,
      },
    ],
    total: 25,
    status: 'delivering',
  },
];

function Home() {
  return (
    <Container>
      <div className={styles.content}>
        <Alert variant="success">Ola</Alert>

        <div className={styles.provisoru}>
          {mockedOrder.map((order) => (
            <Card key={order.id} order={order.id} {...order} />
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Home;
