const express = require('express'); 
const Services = require('../models/service');
const Booking = require('../models/booking');
const wrapAsync = require('../utils/wrapAsync');
const { validateBooking } = require('../middleware.js'); 
const Customer = require('../models/customer');

const router = express.Router();


router.get('/', (req, res) => 
    res.redirect('/admin/booking/all')
);

router.get('/all', wrapAsync(async (req, res) => {
    const bookings = await Booking.find()
        .populate('customer')
        .populate('serviceId')
        .sort({ date: -1, time: 1 });
    res.render('admin/booking/all', { bookings });
}));

router.get('/new', wrapAsync(async (req, res) => {
    const services = await Services.find({}, "name");
    res.render('admin/booking/new', { services });
}));

router.post('/submit', wrapAsync(async (req, res) => {
    let customer = await Customer.findOne({ email: req.body.customer.email });
    if (!customer) {
        customer = new Customer(req.body.customer);
        await customer.save();
    }

    const newBooking = new Booking({
        customer: customer._id,
        serviceId: req.body.serviceId,
        date: req.body.date,
        time: req.body.time,
        notes: req.body.notes
    });
    await newBooking.save();

    res.redirect('/admin/booking/all');
}));


module.exports = router;
