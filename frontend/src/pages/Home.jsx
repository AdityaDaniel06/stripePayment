import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, OverlayTrigger, Tooltip, Button, Image, Modal, ListGroup } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slice/cartSlice';
import './Home.css';

function Home() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:4000/myProducts')
      .then(res => res.data)
      .then(data => setItems(data));
  }, []);

  const handleShowModal = (item) => {
    setSelectedItem({
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      type: item.type,
      category: item.category,
      publish_year: item.publish_year,
      model_number: item.model_number,
      technology: item.technology,
      version: item.version,
    });
    setShowModal(true);
  };

  const handleAddToCart = (item) => {
    const newitem = { ...item, quantity: 1 };
    dispatch(addToCart(newitem));
  };

  return (
    <>
      <Container fluid className="px-4 mt-4">
        <Row className="g-4" xs={1} sm={2} md={3} lg={4}>
          {items.map(item => (
            <Col key={item.id}>
              <Card className="product-card">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>{item.name}</Tooltip>}
                >
                  <Image src={item.image} className="product-image" />
                </OverlayTrigger>
                <Card.Body>
                  <div className="button-group">
                    <Button variant="primary" size="sm" onClick={() => handleAddToCart(item)}>
                      <FaShoppingCart className="me-2" /> Add to Cart
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => handleShowModal(item)}>
                      View
                    </Button>
                  </div>
                  <Card.Title className="product-title">
                    {item.name}  Rs. {item.price}
                  </Card.Title>
                  <Card.Text className="product-details">
                    <ul>
                    <li>
                        <b>Category:</b> {item?.category}
                      </li>
                      <li>
                        <b>Type:</b> {item?.type}
                      </li>
                      <li>
                        <b>Color:</b> {item?.publish_year}
                      </li>
                      <li>
                        <b>Brand</b> {item?.color}
                      </li>
                      <li>
                        <b>Rating</b> {item?.rating}
                      </li>
                      <li>
                        <b>Availability:</b> {item?.availability}
                      </li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Modal for detailed view */}
      <Modal show={showModal} onHide={() => setShowModal(false)} className="product-modal">
        <Modal.Header closeButton>
          <Modal.Title>{selectedItem && selectedItem.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image src={selectedItem && selectedItem.image} className="modal-image" />
          <Row>
            <Col xs={12}>
              <ListGroup variant="flush">
                {selectedItem && Object.entries(selectedItem).map(([key, value]) => (
                  <ListGroup.Item key={key} className="modal-list-item">
                    <b>{key}:</b> {value}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Home;
