import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

export default function StockModal({
  show,
  setShow,
  title,
  children,
}) {
  return (
    <Modal show={show} onHide={setShow}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  );
}
