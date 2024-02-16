const express = require("express");
const router = express.Router();
const { shortUserUrl } = require("../controllers/url");
const { getUrlusers } = require("../controllers/url");

router.post("/", shortUserUrl);
router.get("/:shortId", getUrlusers);

module.exports = router;
