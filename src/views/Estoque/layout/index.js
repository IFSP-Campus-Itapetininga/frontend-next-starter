import { Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar";

export function StockLayout({ children }) {
  return (
    <Container className={"d-flex p-5"}>
      <Sidebar />
      <Container className="px-5">
        {children}
      </Container>
    </Container>
  );
}
