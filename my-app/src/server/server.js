const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = 3002; // or any port 

app.use(express.json());

// Define a route for creating a payment intent
app.post('/create-payment-intent', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'nzd',
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Error creating payment intent' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});