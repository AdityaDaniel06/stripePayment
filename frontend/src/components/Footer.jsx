import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container fluid>
        <Row>
          <Col>
            <p className="footer-text">
              This is the footer of the eCommerce{' '}
              <span className="footer-heart">&#9829;</span> &copy; 2024
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
