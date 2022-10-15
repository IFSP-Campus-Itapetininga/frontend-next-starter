import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

import Link from 'next/link';

const links = [
  {
    name: 'Início',
    route: '/',
  },
  {
    name: 'Marmitas',
    route: '/marmitas',
  },
];

export default function NavComponent() {
  const renderRoutesLink = () => {
    return links?.map((link) => (
      <Nav.Item key={link.name}>
        <Link href={link.route}>
          <a className="nav-link">{link.name}</a>
        </Link>
      </Nav.Item>
    ));
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand={false} className="mb-3">
        <Container>
          <Navbar.Brand>
            <img
              src="/vercel.svg"
              width="80"
              height="30"
              className="d-inline-block align-top"
              alt=" logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} bsPrefix="" />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand`}
            aria-labelledby={`offcanvasNavbarLabel-expand`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {renderRoutesLink()}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
