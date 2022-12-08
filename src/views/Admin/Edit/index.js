import { getCookie } from 'cookies-next';
import { Layout } from 'layout';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Alert, Button, Container, Form, FormGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as admin from 'services/admin';

const ROLES = {
  1: 'Administrador',
  2: 'Secretário',
  3: 'Instrutor',
  4: 'Almoxarife',
  5: 'Resp. Evento',
  6: 'Aluno',
  7: 'Marmita',
};

export default function Edit({ user }) {
  const { register, handleSubmit } = useForm();
  const [showError, setShowError] = useState(false);
  const router = useRouter();

  const onSubmit = async (values) => {
    try {
      setShowError(false);
      const token = getCookie('auth.token');

      await admin.update(user.id, values, token);

      router.push('/admin');
    } catch (error) {
      setShowError(true);
    }
  };

  return (
    <Layout session="Admin - Editar">
      <Container className="py-5">
        <h1>Criar usuário:</h1>
        <Form method="POST" onSubmit={handleSubmit(onSubmit)}>
          {showError && (
            <Alert variant="danger">
              Não foi possível realizar a operação.
            </Alert>
          )}
          <Form.Group>
            <Form.Label>Nome:</Form.Label>
            <Form.Control
              defaultValue={user.nome}
              type="text"
              placeholder="Informe o nome do usuário"
              {...register('nome', { required: true })}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Senha:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Informe o nome do usuário"
              {...register('senha', { required: true })}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Nível de permissão:</Form.Label>
            <Form.Select
              defaultValue={user.idPapel}
              aria-label="Administrador"
              {...register('idPapel')}
            >
              {Object.entries(ROLES).map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="mt-3">
            <Button type="submit">Salvar</Button>
          </div>
        </Form>
      </Container>
    </Layout>
  );
}
