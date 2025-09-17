const mongoose = require('mongoose');
const data = require('./data');

// Import models
const Admin = require('../models/admin');
const Blog = require('../models/blog');
const Gallery = require('../models/gallery');
const Service = require('../models/service');
const Staff = require('../models/staff');
const Customer = require('../models/customer');
const Booking = require('../models/booking');
const Image = require('../models/image');
const Review = require('../models/review');

mongoose.connect('mongodb://127.0.0.1:27017/salone', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

async function insertData() {
  try {
    // Clear old data
    await Admin.deleteMany();
    await Blog.deleteMany();
    await Gallery.deleteMany();
    await Service.deleteMany();
    await Staff.deleteMany();
    await Customer.deleteMany();
    await Booking.deleteMany();
    await Image.deleteMany();
    await Review.deleteMany();

    // Insert basic data
    await Admin.insertMany(data.admins);
    await Blog.insertMany(data.blogs);
    await Gallery.insertMany(data.galleries);
    const services = await Service.insertMany(data.services);
    await Staff.insertMany(data.staffs);
    const customers = await Customer.insertMany(data.customers);
    await Image.insertMany(data.images);

    // Insert bookings with references
    for (const b of data.bookings) {
      const customer = customers.find(c => c.name === b.customerName);
      const service = services.find(s => s.name === b.serviceName);
      if (customer && service) {
        await Booking.create({
          customer: customer._id,
          serviceId: service._id,
          date: b.date,
          time: b.time,
          notes: b.notes
        });
      }
    }

    // Insert reviews with references
    for (const r of data.reviews) {
      const customer = customers.find(c => c.name === r.customerName);
      if (customer) {
        await Review.create({
          customer: customer._id,
          rating: r.rating,
          reviewText: r.reviewText
        });
      }
    }

    console.log('All data inserted successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
}

insertData();
