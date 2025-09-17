// router/login.js
const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const wrapAsync = require('../utils/wrapAsync');
const bcrypt = require('bcrypt');

// --- Login Page ---
router.get('/login', (req, res) => {
  res.render('admin/login/login', { error: null ,layout: false});
});

// --- Login POST ---
router.post(
  '/login',
  wrapAsync(async (req, res) => {
    const email = req.body.email?.toLowerCase().trim();
    const password = req.body.password?.trim();

    const admin = await Admin.findOne({ contactEmail: email });
    if (!admin) return res.render('admin/login/login', { error: 'Invalid email or password' });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.render('admin/login/login', { error: 'Invalid email or password' });

    req.session.adminId = admin._id;
    res.redirect('/admin/dashboard');
  })
);
// --- Forgot Password Page ---
router.get('/forgot-password', (req, res) => {
  res.render('admin/login/forgetPass', { message: null, error: null });
});

// --- Handle Forgot Password POST ---
router.post(
  '/forgot-password',
  wrapAsync(async (req, res) => {
    const email = req.body.email?.toLowerCase().trim();
    const admin = await Admin.findOne({ contactEmail: email });

    if (!admin) {
      return res.render('admin/login/forgetPass', { message: null, error: 'Email not found' });
    }

    // Email exists → render reset page
    res.render('admin/login/reset', { adminId: admin._id, error: null ,layout: false});
  })
);

// --- Handle Reset Password POST ---
router.post(
  '/reset-password',
  wrapAsync(async (req, res) => {
    const { adminId, newPassword, confirmPassword } = req.body;

    if (!newPassword || !confirmPassword) {
      return res.render('admin/login/reset', { adminId, error: 'Please fill all fields' });
    }

    if (newPassword !== confirmPassword) {
      return res.render('admin/login/reset', { adminId, error: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await Admin.findByIdAndUpdate(adminId, { password: hashedPassword });

    res.redirect('/admin/login');
  })
);

module.exports = router;
