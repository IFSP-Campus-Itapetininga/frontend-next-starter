import { Container } from 'react-bootstrap';
import { Layout } from 'layout';

import { convertMonetary } from 'utils';

export default function StatisticView({ products, isLoading }) {
  return (
    <Layout session="Marmitas">
      <Container className="py-4">
        <div>
          <h1>Teste</h1>
        </div>
      </Container>
    </Layout>
  );
}
