import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ModalComponent({
  show,
  setShow,
  title,
  handleButton,
  buttonText,
  children,
}) {
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleButton}>
          {buttonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
