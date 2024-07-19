const express = require("express");
const { createContactUs } = require("../Controllers/contactUsController");
const router = express.Router();

router.post("/contact", createContactUs);

module.exports = router;