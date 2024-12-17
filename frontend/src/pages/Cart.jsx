import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaTrash, FaRupeeSign } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, descrementQnty, incrementQnty } from '../slice/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const cart = useSelector((state) => state.cart.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAmount = cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <Container fluid className="px-4 mt-5">
      {/* Page Title */}
      <h2 className="text-center mb-4" style={{ fontWeight: '600', color: '#333', letterSpacing: '1px' }}>
        Shopping Cart
      </h2>

      {/* Cart Items Grid */}
      <Row className="g-4" xs={1} sm={2} md={2} lg={3}>
        {cart.map((item) => (
          <Col key={item.id} className="d-flex">
            <Card
              className="shadow-sm rounded cart-card hover-effect"
              style={{
                flex: '1 1 auto',
                border: 'none',
                transition: 'transform 0.3s ease',
              }}
            >
              {/* Card Header */}
              <Card.Header
                className="d-flex justify-content-between align-items-center"
                style={{
                  backgroundColor: '#f8f9fa',
                  borderBottom: '1px solid #e0e0e0',
                  fontWeight: '500',
                  color: '#555',
                }}
              >
                <span className="text-truncate" style={{ maxWidth: '200px' }}>{item.name}</span>
                <Button
                  variant="danger"
                  size="sm"
                  className="shadow-none"
                  onClick={() => handleRemoveFromCart(item)}
                >
                  <FaTrash />
                </Button>
              </Card.Header>

              {/* Image */}
              <Card.Img
                variant="top"
                src={item.image}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderBottom: '1px solid #e0e0e0',
                }}
              />

              {/* Card Body */}
              <Card.Body className="d-flex justify-content-between align-items-center" style={{ padding: '1rem' }}>
                <div>
                  <span style={{ fontWeight: '500', color: '#444' }}>
                    Price: <FaRupeeSign size={12} /> {item.price}
                  </span>
                </div>
                <div className="d-flex align-items-center">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => dispatch(descrementQnty(item.id))}
                    className="me-2"
                  >
                    -
                  </Button>
                  <span style={{ fontWeight: '600', color: '#333' }}>{item.quantity}</span>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => dispatch(incrementQnty(item.id))}
                    className="ms-2"
                  >
                    +
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Total Amount and Checkout */}
      <Row className="mt-4">
        <Col>
          <Card
            className="shadow-lg rounded"
            style={{ backgroundColor: '#f8f9fa', border: 'none', padding: '1.5rem' }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <h4 style={{ fontWeight: '700', color: '#333' }}>
                Total Amount: <FaRupeeSign className="mb-1" /> {totalAmount}
              </h4>
              <Button
                variant="success"
                size="lg"
                className="px-4 shadow-none"
                onClick={() => navigate('/checkout')}
                style={{ fontWeight: '500', textTransform: 'uppercase' }}
              >
                Checkout
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Custom Hover Effect */}
      <style>
        {`
          .hover-effect:hover {
            transform: translateY(-5px);
          }
          .cart-card {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>
    </Container>
  );
};

export default Cart;
