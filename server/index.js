// // // // import express from 'express';
// // // // import cors from 'cors';
// // // // import dotenv from 'dotenv';
// // // // import path from 'path';
// // // // import { fileURLToPath } from 'url';
// // // // import Stripe from 'stripe';
// // // // import Razorpay from 'razorpay';
// // // // import mongoose from 'mongoose';

// // // // // MongoDB Connection
// // // // const mongoURI = process.env.MONGO_URI;

// // // // mongoose.connect(mongoURI)
// // // //   .then(() => console.log("✅ MongoDB Atlas se connection successful!"))
// // // //   .catch((err) => console.log("❌ Database connection mein error: ", err));

// // // // dotenv.config();

// // // // const __filename = fileURLToPath(import.meta.url);
// // // // const __dirname = path.dirname(__filename);

// // // // const app = express();
// // // // app.use(cors());
// // // // app.use(express.json());

// // // // // Static frontend
// // // // app.use(express.static(path.join(__dirname, '..')));

// // // // // In-memory data (reuse client data via static import)
// // // // import { RESTAURANTS, MENUS } from './data.js';

// // // // // API endpoints
// // // // app.get('/api/restaurants', (req, res) => {
// // // //   res.json(RESTAURANTS);
// // // // });

// // // // app.get('/api/restaurants/:id/menu', (req, res) => {
// // // //   const menu = MENUS[req.params.id] || [];
// // // //   res.json(menu);
// // // // });

// // // // // Orders (simple in-memory store)
// // // // const ORDERS = [];

// // // // app.post('/api/orders', (req, res) => {
// // // //   const order = { id: `ord_${Date.now()}`, ...req.body, createdAt: new Date().toISOString() };
// // // //   ORDERS.push(order);
// // // //   res.json(order);
// // // // });

// // // // // Stripe Checkout
// // // // const stripeSecret = process.env.STRIPE_SECRET_KEY || '';
// // // // const stripe = stripeSecret ? new Stripe(stripeSecret) : null;

// // // // app.post('/api/checkout', async (req, res) => {
// // // //   try {
// // // //     if (!stripe) return res.status(500).json({ error: 'Stripe not configured' });
// // // //     const { items, successUrl, cancelUrl } = req.body;
// // // //     if (!Array.isArray(items) || !items.length) return res.status(400).json({ error: 'No items' });

// // // //     const line_items = items.map((i) => ({
// // // //       price_data: {
// // // //         currency: 'inr',
// // // //         product_data: { name: i.name },
// // // //         unit_amount: Math.round(i.price * 100)
// // // //       },
// // // //       quantity: i.quantity
// // // //     }));

// // // //     const session = await stripe.checkout.sessions.create({
// // // //       mode: 'payment',
// // // //       payment_method_types: ['card'],
// // // //       line_items,
// // // //       success_url: successUrl,
// // // //       cancel_url: cancelUrl
// // // //     });
// // // //     res.json({ id: session.id, url: session.url });
// // // //   } catch (e) {
// // // //     res.status(500).json({ error: e.message });
// // // //   }
// // // // });

// // // // // Razorpay Order create (INR)
// // // // const rzpKeyId = process.env.RAZORPAY_KEY_ID || '';
// // // // const rzpKeySecret = process.env.RAZORPAY_KEY_SECRET || '';
// // // // const razorpay = rzpKeyId && rzpKeySecret ? new Razorpay({ key_id: rzpKeyId, key_secret: rzpKeySecret }) : null;

// // // // app.get('/api/razorpay/key', (req, res) => {
// // // //   if (!rzpKeyId) return res.status(500).json({ error: 'Razorpay not configured' });
// // // //   res.json({ keyId: rzpKeyId });
// // // // });

// // // // app.post('/api/razorpay/order', async (req, res) => {
// // // //   try {
// // // //     if (!razorpay) return res.status(500).json({ error: 'Razorpay not configured' });
// // // //     const { items, receipt } = req.body;
// // // //     if (!Array.isArray(items) || !items.length) return res.status(400).json({ error: 'No items' });
// // // //     const amount = Math.round(items.reduce((s, i) => s + i.price * i.quantity, 0) * 100);
// // // //     const order = await razorpay.orders.create({ amount, currency: 'INR', receipt: receipt || `rcp_${Date.now()}` });
// // // //     res.json(order);
// // // //   } catch (e) {
// // // //     res.status(500).json({ error: e.message });
// // // //   }
// // // // });

// // // // // Fallback to index for static site routing
// // // // app.get('*', (req, res) => {
// // // //   res.sendFile(path.join(__dirname, '..', 'index.html'));
// // // // });

// // // // const port = process.env.PORT || 3000;
// // // // app.listen(port, () => console.log(`Server running on http://localhost:${port}`));


// // // import express from 'express';
// // // import cors from 'cors';
// // // import dotenv from 'dotenv';
// // // import path from 'path';
// // // import { fileURLToPath } from 'url';
// // // import Stripe from 'stripe';
// // // import Razorpay from 'razorpay';
// // // import mongoose from 'mongoose';

// // // // 1. Sabse pehle dotenv config karein
// // // dotenv.config();

// // // const __filename = fileURLToPath(import.meta.url);
// // // const __dirname = path.dirname(__filename);

// // // // 2. Ab MongoDB connection setup karein (dotenv ke baad)
// // // const mongoURI = process.env.MONGO_URI;

// // // if (!mongoURI) {
// // //   console.error("❌ ERROR: MONGO_URI is not defined in .env file!");
// // // } else {
// // //   mongoose.connect(mongoURI)
// // //     .then(() => console.log("✅ MongoDB Atlas se connection successful!"))
// // //     .catch((err) => console.log("❌ Database connection mein error: ", err));
// // // }

// // // const app = express();
// // // app.use(cors());
// // // app.use(express.json());

// // // // Static frontend
// // // app.use(express.static(path.join(__dirname, '..')));

// // // // In-memory data (data.js se import)
// // // import { RESTAURANTS, MENUS } from './data.js';

// // // // API endpoints
// // // app.get('/api/restaurants', (req, res) => {
// // //   res.json(RESTAURANTS);
// // // });

// // // app.get('/api/restaurants/:id/menu', (req, res) => {
// // //   const menu = MENUS[req.params.id] || [];
// // //   res.json(menu);
// // // });

// // // // Orders logic (Abhi in-memory hai, baad mein DB mein move karenge)
// // // const ORDERS = [];
// // // app.post('/api/orders', (req, res) => {
// // //   const order = { id: `ord_${Date.now()}`, ...req.body, createdAt: new Date().toISOString() };
// // //   ORDERS.push(order);
// // //   res.json(order);
// // // });

// // // // Stripe & Razorpay logic (As it is)
// // // // ... (Aapka baaki ka checkout code yaha aayega)

// // // // Fallback to index
// // // app.get('*', (req, res) => {
// // //   res.sendFile(path.join(__dirname, '..', 'index.html'));
// // // });

// // // const port = process.env.PORT || 3000;
// // // app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));

// // // server/index.js mein ise update karein
// // mongoose.connect(mongoURI, {
// //   family: 4 // Ye line Node.js ko sirf IPv4 use karne ke liye force karegi
// // })
// // .then(() => {
// //   console.log("✅ Congratulations! MongoDB Atlas se connection successful!");
// // })
// // .catch((err) => {
// //   console.log("❌ Connection Error Detail: ", err.message);
// // });


// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import Stripe from 'stripe';
// import Razorpay from 'razorpay';
// import mongoose from 'mongoose'; // 1. Ye import hona zaroori hai


// // 2. Sabse pehle environment variables load karein
// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // 3. MongoDB Connection Setup (dotenv ke baad)
// const mongoURI = process.env.MONGO_URI;

// if (!mongoURI) {
//   console.error("❌ ERROR: .env file mein MONGO_URI nahi mila!");
// } else {
//   mongoose.connect(mongoURI, {
//     family: 4 // GTU students ke liye IPv4 force karna best hai
//   })
//   .then(() => console.log("✅ Congratulations! MongoDB Atlas se connection successful!"))
//   .catch((err) => console.log("❌ Database connection error: ", err.message));
// }

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Static frontend serve karein
// app.use(express.static(path.join(__dirname, '..')));

// // In-memory data import (Baad mein ise DB mein move karenge)
// import { RESTAURANTS, MENUS } from './data.js';

// // --- API Endpoints ---

// app.get('/api/restaurants', (req, res) => {
//   res.json(RESTAURANTS);
// });

// app.get('/api/restaurants/:id/menu', (req, res) => {
//   const menu = MENUS[req.params.id] || [];
//   res.json(menu);
// });

// // Simple orders store (Abhi ke liye)
// const ORDERS = [];
// app.post('/api/orders', (req, res) => {
//   const order = { id: `ord_${Date.now()}`, ...req.body, createdAt: new Date().toISOString() };
//   ORDERS.push(order);
//   res.json(order);
// });

// // --- Stripe Checkout ---
// const stripeSecret = process.env.STRIPE_SECRET_KEY || '';
// const stripe = stripeSecret ? new Stripe(stripeSecret) : null;

// app.post('/api/checkout', async (req, res) => {
//   try {
//     if (!stripe) return res.status(500).json({ error: 'Stripe not configured' });
//     const { items, successUrl, cancelUrl } = req.body;
//     const line_items = items.map((i) => ({
//       price_data: {
//         currency: 'inr',
//         product_data: { name: i.name },
//         unit_amount: Math.round(i.price * 100)
//       },
//       quantity: i.quantity
//     }));
//     const session = await stripe.checkout.sessions.create({
//       mode: 'payment',
//       payment_method_types: ['card'],
//       line_items,
//       success_url: successUrl,
//       cancel_url: cancelUrl
//     });
//     res.json({ id: session.id, url: session.url });
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

// // --- Razorpay Checkout ---
// const rzpKeyId = process.env.RAZORPAY_KEY_ID || '';
// const rzpKeySecret = process.env.RAZORPAY_KEY_SECRET || '';
// const razorpay = rzpKeyId && rzpKeySecret ? new Razorpay({ key_id: rzpKeyId, key_secret: rzpKeySecret }) : null;

// app.get('/api/razorpay/key', (req, res) => {
//   if (!rzpKeyId) return res.status(500).json({ error: 'Razorpay not configured' });
//   res.json({ keyId: rzpKeyId });
// });

// app.post('/api/razorpay/order', async (req, res) => {
//   try {
//     if (!razorpay) return res.status(500).json({ error: 'Razorpay not configured' });
//     const { items, receipt } = req.body;
//     const amount = Math.round(items.reduce((s, i) => s + i.price * i.quantity, 0) * 100);
//     const order = await razorpay.orders.create({ amount, currency: 'INR', receipt: receipt || `rcp_${Date.now()}` });
//     res.json(order);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

// // SPA fallback
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'index.html'));
// });

// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Stripe from 'stripe';
import Razorpay from 'razorpay';
import mongoose from 'mongoose';
import User from './models/User.js'; // Model Import Karein

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mongoURI = process.env.MONGO_URI;
if (mongoURI) {
  mongoose.connect(mongoURI, { family: 4 })
    .then(() => console.log("✅ MongoDB Atlas connected!"))
    .catch((err) => console.log("❌ DB Error: ", err.message));
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

import { RESTAURANTS, MENUS } from './data.js';

// --- AUTH APIs ---

// 1. Signup API
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email already registered" });

    const newUser = new User({ name, email, password });
    await newUser.save();
    res.json({ name: newUser.name, email: newUser.email });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// 2. Login API
// app.post('/api/login', async (req, res) => {
//   try {
//     // 1. Data ko trim karein taaki extra space na rahe
//     const email = req.body.email.toLowerCase().trim();
//     const password = req.body.password;

//     console.log(`Attempting login for: ${email}`); // Terminal mein check karne ke liye

//     // 2. Database mein user dhundein
//     const user = await User.findOne({ email: email });
    
//     if (!user) {
//       console.log("❌ User database mein nahi mila");
//       return res.status(401).json({ error: "User nahi mila! Signup karein." });
//     }

//     // 3. Password match karein
//     if (user.password !== password) {
//       console.log("❌ Password match nahi hua");
//       return res.status(401).json({ error: "Email ya Password galat hai!" });
//     }

//     console.log("✅ Login Successful!");
//     res.json({ name: user.name, email: user.email });
//   } catch (e) {
//     console.log("❌ Server Error:", e.message);
//     res.status(500).json({ error: "Server mein kuch dikkat hai." });
//   }
// });

// 3. Forgot Password API (Working)
app.post('/api/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    user.password = newPassword;
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// --- Baki APIs (Restaurants, Checkout, etc.) ---
app.get('/api/restaurants', (req, res) => res.json(RESTAURANTS));
app.get('/api/restaurants/:id/menu', (req, res) => res.json(MENUS[req.params.id] || []));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'index.html')));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Server on http://localhost:${port}`));


// Check if email exists
app.post('/api/check-email', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(404).json({ error: "Ye email registered nahi hai!" });
    }
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});


// // Profile Update API
// app.post('/api/profile/update', async (req, res) => {
//   try {
//     const { email, name, mobile, address } = req.body;
//     const user = await User.findOneAndUpdate(
//       { email: email },
//       { name, mobile, address },
//       { new: true }
//     );
//     // Updated user bhejein jisme mobile saved ho
//     res.json(user); 
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });


// --- Login API Updated ---
app.post('/api/login', async (req, res) => {
  try {
    const email = req.body.email.toLowerCase().trim();
    const password = req.body.password;

    const user = await User.findOne({ email: email });
    
    if (!user) return res.status(401).json({ error: "User nahi mila!" });
    if (user.password !== password) return res.status(401).json({ error: "Password galat hai!" });

    // ZAROORI: mobile aur address bhi res.json mein bhejein
    res.json({ 
      name: user.name, 
      email: user.email,
      mobile: user.mobile || "", 
      address: user.address || { line1: "", city: "", pin: "" }
    });
  } catch (e) {
    res.status(500).json({ error: "Server Error" });
  }
});

// --- Profile Update API ---
app.post('/api/profile/update', async (req, res) => {
  try {
    const { email, name, mobile, address } = req.body;
    const user = await User.findOneAndUpdate(
      { email: email },
      { name, mobile, address },
      { new: true } // updated user hi return hoga
    );
    res.json(user); 
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


// Server Route for Contact Messages
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Yahan hum model banaye bina direct save bhi kar sakte hain agar mongoose set hai
    const newMessage = { name, email, subject, message, date: new Date() };
    
    // Message terminal mein dikhayein (Development ke liye)
    console.log("New Message Received:", newMessage);
    
    // MongoDB mein save karein
    await mongoose.connection.collection('contacts').insertOne(newMessage);
    
    res.json({ success: true, message: "Aapka message save ho gaya!" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});