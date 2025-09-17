require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const ejsLayouts = require('express-ejs-layouts');
const path = require('path');
const methodOverride = require('method-override');

const app = express();

// Models
const Admin = require('./models/admin');

// Middleware
const { isAdminLoggedIn } = require('./middleware');

// Routers
const adminRouter = require('./router/login'); // handles /login, /forgot-password, /reset-password, /logout
const dashboardRouter = require('./router/dashboard');
const bookingRouter = require('./router/booking');
const customersRouter = require('./router/customers');
const galleryRouter = require('./router/gallery');
const reviewsRouter = require('./router/reviews');
const serviceRouter = require('./router/service');
const staffRouter = require('./router/staff');
const settingRouter = require('./router/settings');

// --- Middleware ---
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Session ---
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }, // secure: false for localhost
  })
);

// --- Inject admin into locals ---
app.use(async (req, res, next) => {
  if (req.session.adminId) {
    try {
      const admin = await Admin.findById(req.session.adminId);
      res.locals.admin = admin || null;
    } catch {
      res.locals.admin = null;
    }
  } else {
    res.locals.admin = null;
  }
  next();
});

// --- EJS Setup ---
app.use(ejsLayouts);
app.set('view engine', 'ejs');
app.set('layout', 'layouts/boilerplate');
app.set('views', path.join(__dirname, 'views'));

// --- Static Files ---
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

// --- MongoDB Connection ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// --- Routes ---
// Auth routes handled inside login.js
app.use('/admin', adminRouter);

// Protected routes
app.use('/admin/dashboard', isAdminLoggedIn, dashboardRouter);
app.use('/admin/booking', isAdminLoggedIn, bookingRouter);
app.use('/admin/customers', isAdminLoggedIn, customersRouter);
app.use('/admin/gallery', isAdminLoggedIn, galleryRouter);
app.use('/admin/reviews', isAdminLoggedIn, reviewsRouter);
app.use('/admin/services', isAdminLoggedIn, serviceRouter);
app.use('/admin/staff', isAdminLoggedIn, staffRouter);
app.use('/admin/settings', isAdminLoggedIn, settingRouter);

// Root redirect
app.get('/', (req, res) => {
  if (req.session.adminId) return res.redirect('/admin/dashboard');
  return res.redirect('/admin/login');
});

// --- Error Handler ---
app.use((err, req, res, next) => {
  console.error('Error handler caught:', err);
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Something went wrong!';
  res.status(statusCode).render('error', { err });
});

// --- Start Server ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
