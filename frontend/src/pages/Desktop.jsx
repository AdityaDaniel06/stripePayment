import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  OverlayTrigger,
  Tooltip,
  Button,
  Image,
  Modal,
  ListGroup,
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../slice/cartSlice";

const Desktop = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:4000/myProducts?type=wall")
      .then((res) => res.data)
      .then((data) => setItems(data));
  }, []);

  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleAddToCart = (item) => {
    const newitem = { ...item, quantity: 1 };
    dispatch(addToCart(newitem));
  };

  return (
    <>
      {/* Page Title */}
      <Container fluid className="px-4 mt-4">
        <h2
          className="text-center mb-4"
          style={{
            fontWeight: "600",
            color: "#333",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Wall Clocks Collection
        </h2>

        {/* Cards Grid */}
        <Row className="g-4" xs={1} sm={2} md={3} lg={4}>
          {items.map((item) => (
            <Col key={item.id} className="d-flex">
              <Card
                style={{
                  border: "none",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                }}
                className="hover-scale"
              >
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>{item.name}</Tooltip>}
                >
                  <Image
                    src={item.image}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                    }}
                  />
                </OverlayTrigger>
                <Card.Body>
                  <Card.Title
                    className="text-center mb-3"
                    style={{
                      fontWeight: "600",
                      fontSize: "1rem",
                      color: "#555",
                    }}
                  >
                    {item.name}
                  </Card.Title>
                  <Card.Text className="text-center mb-2 text-muted">
                    Rs. {item.price}
                  </Card.Text>
                  <div className="d-flex justify-content-around">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleAddToCart(item)}
                    >
                      <FaShoppingCart className="me-1" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleShowModal(item)}
                    >
                      View Details
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center" style={{ color: "#333" }}>
            {selectedItem && selectedItem.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={5} className="d-flex align-items-center justify-content-center">
              <Image
                src={selectedItem?.image}
                fluid
                style={{
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
              />
            </Col>
            <Col md={7}>
              <ListGroup variant="flush">
                {selectedItem &&
                  Object.entries(selectedItem).map(([key, value]) => (
                    <ListGroup.Item key={key} className="py-2">
                      <strong style={{ textTransform: "capitalize" }}>
                        {key}:
                      </strong>{" "}
                      {value}
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Hover Scale Effect */}
      <style>
        {`
          .hover-scale:hover {
            transform: scale(1.05);
          }
          .hover-scale {
            transition: transform 0.3s ease;
          }
        `}
      </style>
    </>
  );
};

export default Desktop;
