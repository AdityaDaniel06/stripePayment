import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';

import Home from "./pages/Home";
import Layout from "./Layout";
import Desktop from "./pages/Desktop";
import Mobile from "./pages/Mobile";
import Cart from "./pages/Cart";
import Laptop from "./pages/Laptop";
import Checkout from "./pages/Checkout";
import { loadStripe } from '@stripe/stripe-js';

// Stripe public key
const stripePromise = loadStripe('pk_test_51QWgGG09WXO0DMqRdKoKyvq9XDdwtVxBVQNRDCYrBaa85FokTPi9x8zbH07lZWEWHKv0EKEqJRBH0Kvy5XBcTPm7006hBhmtyt');

const App = () => {
  return (
    // Wrap the application with the Stripe Elements provider
    <Elements stripe={stripePromise}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/desktop" element={<Desktop />} />
            <Route path="/laptop" element={<Laptop />} />
            <Route path="/mobile" element={<Mobile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Elements>
  );
};

export default App;
