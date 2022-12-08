import { Modal, Button } from "react-bootstrap";
import { deleteContact, deleteItem, deleteItemHasVendor, deleteVendor } from "services/estoque";


const DeleteModal = ({ showModal, id, type, setShow, getData }) => {

  async function handleDeleteContact() {
    if (type === 'contact') {
      deleteContact(id);
      getData();
      setShow();
    };
  }

  async function handleDeleteItem() {
    if (type === 'item') deleteItem(id);
    if (type === 'vendor') deleteVendor(id);
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
        <div class="d-flex justify-content-around">
          {
            type === 'contact' ?
              <Button variant="success" onClick={handleDeleteContact}>Sim</Button> :
              <Button variant="success" onClick={handleDeleteItem}>Sim</Button>
          }
          <Button variant="danger" onClick={setShow}>Não</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteModal;