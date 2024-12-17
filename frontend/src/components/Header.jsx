import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { IoWatchOutline } from "react-icons/io5";
import { GoStopwatch } from "react-icons/go";
import { GiWatch, GiPocketWatch } from "react-icons/gi";
import { useSelector } from "react-redux";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const cartData = useSelector((state) => state.cart.data);

  return (
    <Navbar bg="primary" expand="lg" variant="dark" className="header-navbar shadow-sm py-2">
      <Container>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/" className="header-brand fw-bold">
          <FaHome className="nav-icon me-1" />
          Home
        </Navbar.Brand>

        {/* Toggle for Mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Collapsible Navigation */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/desktop" className="header-link">
              <IoWatchOutline className="nav-icon me-2" />
              Smart Watch
            </Nav.Link>
            <Nav.Link as={Link} to="/laptop" className="header-link">
              <GoStopwatch className="nav-icon me-2" />
              Wall Clock
            </Nav.Link>
            <Nav.Link as={Link} to="/mobile" className="header-link">
              <GiWatch className="nav-icon me-2" />
              Luxury Watch
            </Nav.Link>
            <Nav.Link as={Link} to="/pocket-watch" className="header-link">
              <GiPocketWatch className="nav-icon me-2" />
              Pocket Watch
            </Nav.Link>
          </Nav>

          {/* Cart */}
          <Nav>
            <Nav.Link
              onClick={() => navigate("/cart")}
              className="header-cart-link position-relative"
            >
              <FaShoppingCart className="nav-icon" />
              {cartData.length > 0 && (
                <Badge
                  bg="danger"
                  className="cart-badge position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: "0.75rem", borderRadius: "50%" }}
                >
                  {cartData.length}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
