import Offcanvas from 'react-bootstrap/Offcanvas';

export default function OffCanvas({ show, setShow, title, ...props }) {
  const handleClose = () => setShow(false);

  return (
    <Offcanvas show={show} onHide={handleClose} {...props}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>{props.children}</Offcanvas.Body>
    </Offcanvas>
  );
}
