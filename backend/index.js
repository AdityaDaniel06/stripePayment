const express = require("express");
const app = express();
const mongoose = require("mongoose");

const stripe = require('stripe')('sk_test_51QWgGG09WXO0DMqR4FQVDzOHQWQ5Evt95l4JnfvmVJ83Rsg9uunNqcVnHDEfnKVEUvmmlKHB0yKFlz0GwnVGCZbq00YjoD4ZQR');

const cors = require("cors");
app.use(cors());

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

app.use(express.json());

const orderSchema = new mongoose.Schema({
    name: String,
    email: String,
    paymentType: String,
    transactionId: String,
    paymentStatus: String,
    totalAmount: Number,
    items: Array,
    createdAt: { type: Date, default: Date.now },
  });

  const Order = mongoose.model("Order", orderSchema);

  
const port = process.env.PORT || 3000;
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
  console.log("MongoDB Connected");
});

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      payment_method_types: ["card"],
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Payment Intent Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route: Save Order to Database
app.post("/api/orders", async (req, res) => {
  const { name, email, paymentType, transactionId, paymentStatus, totalAmount, items } = req.body;

  try {
    const order = new Order({
      name,
      email,
      paymentType,
      transactionId,
      paymentStatus,
      totalAmount,
      items,
    });

    await order.save();
    res.status(201).json({ message: "Order saved successfully" });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ message: "Failed to save order" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
