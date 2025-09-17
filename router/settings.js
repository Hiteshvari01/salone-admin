const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const wrapAsync = require("../utils/wrapAsync");
const { validateAdmin } = require("../middleware");
const methodOverride = require("method-override");
const multer = require("multer");
const { storage } = require("../config.js"); // Cloudinary storage
const upload = multer({ storage });
const cloudinary = require("cloudinary").v2;

router.use(methodOverride("_method"));

// -------- SHOW PROFILE --------
router.get("/", wrapAsync(async (req, res) => {
    const admin = await Admin.findOne({});
    if (!admin) return res.redirect("/admin/settings/new");
    res.render("admin/settings/all", { admin });
}));

// -------- EDIT PROFILE FORM --------
router.get("/:id/edit", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    res.render("admin/settings/edit", { admin });
}));

// -------- UPDATE PROFILE --------
router.put("/:id", upload.single("profileImage"), validateAdmin, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { body, file } = req;

    const updateData = { ...body };

    if (file) {
        const admin = await Admin.findById(id);

        // Delete old image if exists
        if (admin.profileImage?.filename) {
            await cloudinary.uploader.destroy(admin.profileImage.filename);
        }

        // Save new image
        updateData.profileImage = {
            url: file.path,
            filename: file.filename
        };
    }
     console.log("File received:", file);
console.log("Body received:", body);

    await Admin.findByIdAndUpdate(id, updateData, { runValidators: true });
    res.redirect("/admin/settings");
}));

// -------- NEW ADMIN FORM --------
router.get("/new", (req, res) => {
    res.render("admin/settings/new");
});

// -------- CREATE NEW ADMIN --------
router.post("/", upload.single("profileImage"), validateAdmin, wrapAsync(async (req, res) => {
    const existingAdmin = await Admin.findOne({});
    if (existingAdmin) throw new ExpressError(400, "Admin already exists");

    const newAdmin = new Admin(req.body);

    if (req.file) {
        newAdmin.profileImage = {
            url: req.file.path,
            filename: req.file.filename
        };
    }
   console.log("File received:", file);
console.log("Body received:", body);

    await newAdmin.save();
    res.redirect("/admin/settings");
}));

module.exports = router;
