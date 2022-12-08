import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import ContactEditForm from '../ContactEditForm';
import DeleteModal from '../DeleteModal';
import StockModal from '../StockModal';

const VendorContacts = ({ contatos, getContacts }) => {
  const [contacts, setContacts] = useState([]);
  const [newEditContact, setNewEditContact] = useState(false);
  const [selectedContact, setSelectedContact] = useState(false);
  const [selectedItem, setSelectedItem] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    setContacts(contatos)
  }, [contatos]);

  function updateContacts() {
    console.log('Chamou!')
    console.log(contacts)
    contatos.forEach(contato => {
      if (contato.contatoid === selectedItem) {
        const newItems = [...contatos];
        const index = newItems.findIndex(contato => contato.contatoid === selectedItem);
        newItems.splice(index, 1);
        setContacts(newItems);
      }
    })
  }

  function handleEditContact(data) {
    setSelectedContact(data);
    setNewEditContact(true);
  }


  function handleShowDeleteModal(id) {
    setSelectedItem(id);
    setShowDeleteModal(true);
  }

  return (
    <>
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
          {contacts &&
            contacts.map((contato, key) => {
              return (
                <tr key={key}>
                  <td className="text-center">{contato.contatoid}</td>
                  <td>{contato.nome}</td>
                  <td>{contato.funcao}</td>
                  <td className="text-center">{contato.email}</td>
                  <td className="text-center">{contato.telefone}</td>
                  <td>
                    <div className="text-center">
                      <Button
                        variant="success"
                        style={{ marginRight: '20px' }}
                        onClick={() => handleEditContact(contato)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleShowDeleteModal(contato.contatoid)}>
                        Excluir
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <StockModal
        show={newEditContact}
        setShow={() => setNewEditContact(false)}
        title="Novo contato"
      >
        <ContactEditForm contactData={selectedContact} setShowContactForm={() => setNewEditContact(false)} />
      </StockModal>
      <DeleteModal
        showModal={showDeleteModal}
        id={selectedItem}
        type='contact'
        setShow={() => setShowDeleteModal(false)}
        getData={updateContacts}
      />
    </>
  );
};

export default VendorContacts;
