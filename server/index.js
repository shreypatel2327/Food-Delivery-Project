import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Stripe from 'stripe';
import Razorpay from 'razorpay';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Static frontend
app.use(express.static(path.join(__dirname, '..')));

// In-memory data (reuse client data via static import)
import { RESTAURANTS, MENUS } from './data.js';

// API endpoints
app.get('/api/restaurants', (req, res) => {
  res.json(RESTAURANTS);
});

app.get('/api/restaurants/:id/menu', (req, res) => {
  const menu = MENUS[req.params.id] || [];
  res.json(menu);
});

// Orders (simple in-memory store)
const ORDERS = [];

app.post('/api/orders', (req, res) => {
  const order = { id: `ord_${Date.now()}`, ...req.body, createdAt: new Date().toISOString() };
  ORDERS.push(order);
  res.json(order);
});

// Stripe Checkout
const stripeSecret = process.env.STRIPE_SECRET_KEY || '';
const stripe = stripeSecret ? new Stripe(stripeSecret) : null;

app.post('/api/checkout', async (req, res) => {
  try {
    if (!stripe) return res.status(500).json({ error: 'Stripe not configured' });
    const { items, successUrl, cancelUrl } = req.body;
    if (!Array.isArray(items) || !items.length) return res.status(400).json({ error: 'No items' });

    const line_items = items.map((i) => ({
      price_data: {
        currency: 'inr',
        product_data: { name: i.name },
        unit_amount: Math.round(i.price * 100)
      },
      quantity: i.quantity
    }));

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items,
      success_url: successUrl,
      cancel_url: cancelUrl
    });
    res.json({ id: session.id, url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Razorpay Order create (INR)
const rzpKeyId = process.env.RAZORPAY_KEY_ID || '';
const rzpKeySecret = process.env.RAZORPAY_KEY_SECRET || '';
const razorpay = rzpKeyId && rzpKeySecret ? new Razorpay({ key_id: rzpKeyId, key_secret: rzpKeySecret }) : null;

app.get('/api/razorpay/key', (req, res) => {
  if (!rzpKeyId) return res.status(500).json({ error: 'Razorpay not configured' });
  res.json({ keyId: rzpKeyId });
});

app.post('/api/razorpay/order', async (req, res) => {
  try {
    if (!razorpay) return res.status(500).json({ error: 'Razorpay not configured' });
    const { items, receipt } = req.body;
    if (!Array.isArray(items) || !items.length) return res.status(400).json({ error: 'No items' });
    const amount = Math.round(items.reduce((s, i) => s + i.price * i.quantity, 0) * 100);
    const order = await razorpay.orders.create({ amount, currency: 'INR', receipt: receipt || `rcp_${Date.now()}` });
    res.json(order);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Fallback to index for static site routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));


