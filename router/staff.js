const express = require('express');
const router = express.Router();
const Staff = require('../models/staff');
const { validateStaff } = require('../middleware');
const wrapAsync = require('../utils/wrapAsync');
const methodOverride = require('method-override');
const multer = require('multer');
const { storage } = require('../config.js'); // Cloudinary storage
const upload = multer({ storage });
const cloudinary = require('cloudinary').v2;

router.use(methodOverride('_method'));

// -------- GET All Staff --------
router.get('/', wrapAsync(async (req, res) => {
    const staffList = await Staff.find();
    const totalStaff = staffList.length;
    res.render('admin/staff/all', { staffList, totalStaff });
}));

// -------- New Staff Form --------
router.get('/add', (req, res) => {
    res.render('admin/staff/new');
});

// -------- Create Staff --------
router.post('/add', upload.single('image'), wrapAsync(async (req, res) => {
    const { name, specialization } = req.body;
    const staffData = { name, specialization };

    if (req.file) {
        staffData.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    } else {
        throw new Error("Image is required"); // ensure required
    }

    await Staff.create(staffData);
    res.redirect('/admin/staff');
}));


// -------- Edit Staff Form --------
router.get('/edit/:id', wrapAsync(async (req, res) => {
    const staff = await Staff.findById(req.params.id);
    if (!staff) throw new Error('Staff not found');
    res.render('admin/staff/edit', { staff });
}));

// -------- Update Staff --------
// -------- UPDATE STAFF --------
router.put("/edit/:id", upload.single("image"), wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { name, specialization } = req.body;
    const staff = await Staff.findById(id);

    // Update text fields
    staff.name = name;
    staff.specialization = specialization;

    // Agar user ne nayi file choose ki hai, to replace karo
    if (req.file) {
        // Optional: old image delete from cloudinary
        if (staff.image?.filename) {
            await cloudinary.uploader.destroy(staff.image.filename);
        }
        staff.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }
    // Agar req.file nahi hai, to existing image wahi rahegi
    await staff.save();
    res.redirect("/admin/staff");
}));

// -------- Delete Staff --------
router.delete('/delete/:id', wrapAsync(async (req, res) => {
    const staff = await Staff.findById(req.params.id);
    if (staff.image?.filename) {
        await cloudinary.uploader.destroy(staff.image.filename);
    }
    await Staff.findByIdAndDelete(req.params.id);
    res.redirect('/admin/staff');
}));

module.exports = router;
