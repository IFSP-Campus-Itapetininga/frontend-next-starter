import { Modal, Button } from "react-bootstrap";
import api from "../../../../services";


const DeleteModal = ({ showModal, iditem }) => {
  async function handleDeleteItem() {
    const response = await api.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/inventory/item/${iditem}`)
      .then(res => {
        alert("Item excluído com sucesso!");
      });
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