import { Container } from 'react-bootstrap';
import { Layout } from 'layout';

import { Card, SectionButton } from '../components';
import styles from './Marmitas.module.scss';

export default function MarmitaView({ orders }) {
  return (
    <Layout session="Marmitas">
      <Container className="py-5">
        <div className={styles.sectionWrapper}>
          <SectionButton goto="/marmitas/pedidos" text="Pedidos" />
          <SectionButton
            color="yellow"
            goto="/marmitas/produto"
            text="Produtos"
          />
          <SectionButton
            color="primary"
            goto="/marmitas/clientes"
            text="Clientes"
          />

          <SectionButton
            color="gray"
            goto="/marmitas/estatistica"
            text="Faturamento"
          />
        </div>
        <div className={styles.wrapper}>
          {orders?.data.map((order) => (
            <Card key={order.id} order={order.id} {...order} />
          ))}
        </div>
      </Container>
    </Layout>
  );
}
