import { Card, Container, Form, Button, Alert } from 'react-bootstrap';
import { Layout } from 'layout';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import * as auth from 'services/auth';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from 'components/AuthProvider';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginError, setLoginError] = useState(false);
  const router = useRouter();
  const { setLoginData } = useContext(AuthContext);

  const onSubmit = async (values) => {
    try {
      setLoginError(false);
      const payload = await auth.createSession(values);

      setLoginData(payload);
    } catch (e) {
      setLoginError(true);
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      {loginError && (
        <Alert variant="danger">
          Usuário ou senha inválidos! Tente novamente.
        </Alert>
      )}
      <Card>
        <Card.Body>
          <div className="bg-dark d-flex justify-content-center p-2 mb-3">
            <Image
              src="/sexta-logo.svg"
              width="80"
              height="30"
              className="d-inline-block align-top"
              alt=" logo"
            />
          </div>
          <Card.Title>Entrar</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Faça o login para ter acesso a plataforma!
          </Card.Subtitle>
          <Form onSubmit={handleSubmit(onSubmit)} method="POST">
            <Form.Group className="mb-3">
              <Form.Label>Usuário:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite seu usuário"
                required
                {...register('nomeUsuario', { required: true })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Senha:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Digite sua senha"
                required
                {...register('senha', { required: true })}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Entrar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
