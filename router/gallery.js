const express = require("express");
const router = express.Router();
const GalleryImage = require("../models/gallery"); // GalleryImage model
const { validateGalleryImage } = require("../middleware"); // Joi validation
const wrapAsync = require("../utils/wrapAsync"); // Async error handler
const methodOverride = require("method-override");
const multer = require("multer");
const { storage } = require("../config.js"); // multer-storage-cloudinary
const upload = multer({ storage });

// Use method-override for PUT/DELETE
router.use(methodOverride("_method"));

// -------- GET ALL IMAGES --------
router.get("/", wrapAsync(async (req, res) => {
    const images = await GalleryImage.find({});
    res.render("admin/gallery/all", { images });
}));

// -------- NEW IMAGE FORM --------
router.get("/new", (req, res) => {
    res.render("admin/gallery/new");
});

// -------- CREATE NEW IMAGE --------
router.post("/", upload.single("image"), validateGalleryImage, wrapAsync(async (req, res) => {
    const { file, body } = req;

    if (!file) {
        req.flash("error", "Image file is required!");
        return res.redirect("/admin/gallery/new");
    }

    const newImage = new GalleryImage(body);
    newImage.imageUrl = {
        url: file.path,       // Cloudinary URL
        filename: file.filename
    };
    await newImage.save();
    res.redirect("/admin/gallery");
}));

// -------- EDIT IMAGE FORM --------
router.get("/:id/edit", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const image = await GalleryImage.findById(id);
    if (!image) {
        req.flash("error", "Image not found");
        return res.redirect("/admin/gallery");
    }
    res.render("admin/gallery/edit", { image });
}));

// -------- UPDATE IMAGE --------
router.put("/:id", upload.single("image"), validateGalleryImage, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { file, body } = req;

    const updateData = { ...body };

    // If a new image is uploaded, update imageUrl
    if (file) {
        updateData.imageUrl = {
            url: file.path,
            filename: file.filename
        };
    }

    await GalleryImage.findByIdAndUpdate(id, updateData);
    res.redirect("/admin/gallery");
}));

// -------- DELETE IMAGE --------
router.delete("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const image = await GalleryImage.findById(id);
    if (image) {
        // Optionally delete from Cloudinary here using filename
        await GalleryImage.findByIdAndDelete(id);
    }
    res.redirect("/admin/gallery");
}));

module.exports = router;
