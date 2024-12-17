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

const Mobile = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:4000/myProducts?type=wrist")
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
      <Container fluid className="px-4 mt-4">
        <h2 className="text-center mb-4">Our Watch Collection</h2>
        <Row className="g-4" xs={1} sm={2} md={3} lg={4}>
          {items.map((item) => (
            <Col key={item.id} className="d-flex">
              <Card
                style={{
                  flex: "1 1 auto",
                  border: "none",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s",
                }}
                className="hover-card"
              >
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>{item.name}</Tooltip>}
                >
                  <Image
                    src={item.image}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                    }}
                  />
                </OverlayTrigger>
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title className="fw-bold text-primary mb-2">
                    {item.name}
                  </Card.Title>
                  <Card.Text>
                    <span className="fw-bold">Price:</span> Rs. {item.price}
                  </Card.Text>
                  <div className="d-flex justify-content-between mt-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="d-inline-block me-2"
                      onClick={() => handleAddToCart(item)}
                    >
                      <FaShoppingCart className="me-2" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline-primary"
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
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        style={{ maxWidth: "800px", margin: "0 auto" }}
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#f8f9fa", borderBottom: "none" }}
        >
          <Modal.Title className="fw-bold text-dark">
            {selectedItem && selectedItem.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <Row className="align-items-center">
              <Col md={6} className="text-center">
                <Image
                  src={selectedItem.image}
                  fluid
                  style={{
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  }}
                />
              </Col>
              <Col md={6}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <b>Price:</b> Rs. {selectedItem.price}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Category:</b> {selectedItem.category}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Type:</b> {selectedItem.type}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Brand:</b> {selectedItem.brand || "N/A"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Availability:</b> {selectedItem.availability || "In Stock"}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer style={{ borderTop: "none", justifyContent: "center" }}>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={() => {
              handleAddToCart(selectedItem);
              setShowModal(false);
            }}
          >
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Mobile;
