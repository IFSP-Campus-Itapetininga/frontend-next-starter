import { Container, Button } from 'react-bootstrap';
import { useForm, FormProvider } from 'react-hook-form';

import { Layout } from 'layout';
import { Input } from 'components';
import { Header } from '../components';

export default function MarmitaView() {
  const methods = useForm();

  const onSubmit = async (values) => {
    console.log(values);
  };

  return (
    <Layout session="Marmitas">
      <Container className="py-4">
        <Header />

        <div className="mt-4">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <Input
                name="titulo"
                placeholeder="Buscar produtos"
                label="Produtos"
              />

              <Button variant="primary" type="submit">
                Buscar
              </Button>
            </form>
          </FormProvider>
        </div>
      </Container>
    </Layout>
  );
}
