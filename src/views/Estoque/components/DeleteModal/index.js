import { Modal, Button } from "react-bootstrap";
import { deleteContact, deleteItem, deleteItemHasVendor, deleteVendor } from "services/estoque";


const DeleteModal = ({ showModal, id, type, setShow, getData}) => {
  async function handleDeleteItem() {
    if (type === 'item') deleteItem(id);
    if (type === 'vendor') deleteVendor(id);
    if (type === 'contact') deleteContact(id);
    if (type === 'itemHasVendor') deleteItemHasVendor(id);
    setShow();
  }

  return (
    <Modal show={showModal}>
      <Modal.Header closeButton>
        <Modal.Title>Atenção!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Deseja mesmo excluir o item?</h4>
        <Button variant="success"onClick={handleDeleteItem}>Sim</Button>
        <Button variant="danger">Não</Button>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteModal;