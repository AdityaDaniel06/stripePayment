import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';

const Checkout = () => {
  const cart = useSelector((state) => state.cart.data);
  const [showForm, setShowForm] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // Payment status (success/error)
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const totalAmount = cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
  const amountInPaise = totalAmount * 100; // Stripe requires the amount in paise (INR smallest unit)

  // Fetch the Stripe client secret
  useEffect(() => {
    if (paymentType === 'stripe') {
      const fetchClientSecret = async () => {
        const response = await fetch('http://localhost:8080/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: amountInPaise }),
        });
        const data = await response.json();
        setClientSecret(data.clientSecret);
      };
      fetchClientSecret();
    }
  }, [paymentType, amountInPaise]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (paymentType === "stripe" && stripe && elements) {
      setIsProcessing(true);
  
      const cardElement = elements.getElement(CardElement);
  
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name, email },
        },
      });
  
      if (error) {
        setPaymentStatus({ type: "error", message: error.message });
        setPaymentSucceeded(false);
      } else if (paymentIntent.status === "succeeded") {
        // Save the order to the database
        await fetch("http://localhost:8080/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            paymentType,
            transactionId: paymentIntent.id,
            paymentStatus: "Success",
            totalAmount,
            items: cart,
          }),
        });
  
        setPaymentStatus({ type: "success", message: "Payment Successful!" });
        setPaymentSucceeded(true);
      }
  
      setIsProcessing(false);
    }
  };
  

  // Success Message Screen
  if (paymentSucceeded) {
    return (
      <Container fluid className="px-4 mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="shadow-lg rounded text-center">
              <Card.Header className="bg-success text-white">
                <h3>Thank You for Your Purchase!</h3>
              </Card.Header>
              <Card.Body>
                <p>Your payment was successful. A confirmation email will be sent shortly.</p>
                <Button variant="success" href="/" className="w-50 mt-3">
                  Back to Home
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid className="px-4 mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg rounded">
            <Card.Header className="bg-primary text-white text-center">
              <h3>Checkout</h3>
            </Card.Header>
            <Card.Body>
              <p className="fw-bold text-center mb-4">Total Price: ₹{totalAmount}</p>

              {paymentStatus && (
                <Alert variant={paymentStatus.type === 'error' ? 'danger' : 'success'} className="text-center">
                  {paymentStatus.message}
                </Alert>
              )}

              {showForm && (
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="formBasicName" className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formBasicEmail" className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group controlId="formBasicPaymentType" className="mb-3">
                    <Form.Label>Payment Type</Form.Label>
                    <Form.Select
                      value={paymentType}
                      onChange={(e) => setPaymentType(e.target.value)}
                      required
                    >
                      <option value="">Select Payment Type</option>
                      <option value="cash">Cash on Delivery</option>
                      <option value="stripe">Stripe</option>
                      <option value="cash">Credit Card</option>
                      <option value="cash">Debit Card</option>
                      <option value="cash">UPI</option>
                      <option value="cash">Netbanking</option>
                    </Form.Select>
                  </Form.Group>

                  {paymentType === 'stripe' && (
                    <>
                      <Form.Label>Card Details</Form.Label>
                      <div className="p-3 border rounded" style={{ backgroundColor: '#f8f9fa' }}>
                        <CardElement
                          options={{
                            style: {
                              base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': { color: '#aab7c4' },
                              },
                              invalid: { color: '#9e2146' },
                            },
                          }}
                        />
                      </div>
                      <Button
                        variant="success"
                        type="submit"
                        className="mt-4 w-100 fw-bold"
                        disabled={!stripe || !elements || isProcessing || !clientSecret}
                      >
                        {isProcessing ? <Spinner animation="border" size="sm" /> : 'Make Payment'}
                      </Button>
                    </>
                  )}

                  {paymentType === 'cash' && (
                    <Button variant="success" className="mt-4 w-100 fw-bold" onClick={() => setPaymentSucceeded(true)}>
                      Confirm Order
                    </Button>
                  )}
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
