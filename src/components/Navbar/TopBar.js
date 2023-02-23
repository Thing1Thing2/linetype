import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function TopBar() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <img
            style={{ width: 40, height: 40 }}
            src={"LineTypeLogo.jpg"}
            class="rounded-circle"
            alt="Cinque Terre"
          />
          &nbsp;
          <Navbar.Brand href="/">LineType</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/explore">Explore</Nav.Link>
            <Nav.Link href="/schedules">Schedules</Nav.Link>
            <Nav.Link href="/addsupplier">Add Supplier</Nav.Link>
            <Nav.Link href="/addProduct">Add Product</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default TopBar;
