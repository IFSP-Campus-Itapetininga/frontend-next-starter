import { Table, Button } from 'react-bootstrap';

const VendorContacts = ({ contatos }) => {
  return (
    <Table striped bordered hover className="mb-5">
      <thead>
        <tr>
          <th className="text-center">Código</th>
          <th className="text-center">Nome</th>
          <th className="text-center">Cargo</th>
          <th className="text-center">E-mail</th>
          <th className="text-center">Telefone</th>
          <th className="text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        {contatos &&
          contatos.map((contato, key) => {
            return (
              <tr key={key}>
                <td className="text-center">{contato.contatoid}</td>
                <td>{contato.nome}</td>
                <td>{contato.funcao}</td>
                <td className="text-center">{contato.email}</td>
                <td className="text-center">{contato.telefone}</td>
                <td>
                  <div className="text-center">
                    <Button variant="success" style={{ marginRight: '20px' }}>
                      Editar
                    </Button>
                    <Button variant="danger">Excluir</Button>
                  </div>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default VendorContacts;
