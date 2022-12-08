import { Alert, Button, Container, Modal } from 'react-bootstrap';
import { Layout } from 'layout';
import { Pagination, Table } from 'components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import * as admin from 'services/admin';
import { getCookie } from 'cookies-next';

const ROLES = {
  1: 'Administrador',
  2: 'Secretário',
  3: 'Instrutor',
  4: 'Almoxarife',
  5: 'Resp. Evento',
  6: 'Aluno',
  7: 'Marmita',
};

export default function Admin({ users = [] }) {
  const router = useRouter();
  const [userId, setUserId] = useState();
  const [showConfirmation, setShowConfirmation] = useState();
  const [showError, setShowError] = useState(false);

  const handleOnConfirm = async () => {
    try {
      setShowError(false);

      await admin.destroy(userId, getCookie('auth.token'));

      router.reload();
    } catch (error) {
      setShowError(true);
    }
  };

  return (
    <Layout session={'Admin'}>
      <Container className="py-5">
        <div>
          <h1>Área do Administrador</h1>

          <div className="mt-4">
            <div className="d-flex justify-content-between mb-3">
              <h3>Usuários:</h3>
              <Button
                variant="success"
                onClick={() => {
                  router.push('/admin/create');
                }}
              >
                Adicionar
              </Button>
            </div>
            {showError && (
              <Alert variant="danger" className="py-2">
                Não foi possível realizar a operação!
              </Alert>
            )}
            <Table
              header={[
                { name: 'ID', acessor: 'id' },
                { name: 'Nome', acessor: 'nome' },
                { name: 'Nome de usuário', acessor: 'nome_usuario' },
                { name: 'Cargo', acessor: 'cargo' },
                { name: '', acessor: 'editar' },
                { name: '', acessor: 'deletar' },
              ]}
              data={users.map((user) => ({
                id: user.id,
                nome: user.nome,
                nome_usuario: user.nomeUsuario,
                cargo: ROLES[user.idPapel],
                editar: () => (
                  <Button
                    variant="primary"
                    onClick={() => {
                      router.push(`/admin/edit?id=${user.id}`);
                    }}
                  >
                    Editar
                  </Button>
                ),
                deletar: () => (
                  <Button
                    variant="danger"
                    onClick={() => {
                      setShowConfirmation(true);
                      setUserId(user.id);
                    }}
                  >
                    Deletar
                  </Button>
                ),
              }))}
            />

            <Modal
              show={showConfirmation}
              onHide={() => {
                setShowConfirmation(false);
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title>Confirmação</Modal.Title>
              </Modal.Header>
              <Modal.Body>Deseja continuar?</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleOnConfirm}>
                  Continuar
                </Button>
                <Button
                  variant="error"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancelar
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
